import { stringify } from 'csv-stringify'
import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import z from 'zod'
import { type Either, right } from '../../../../core/errors/either'
import type { Link } from '../../enterprise/entities/link.ts'
import type { LinksRepository } from '../repositories/links.ts'
import {
  type StorageUploader,
  StorageUploaderFolder,
} from '../storage/storage-uploader'

export enum CsvColumnKey {
  ID = 'id',
  ORIGINAL_URL = 'original_url',
  SHORT_URL = 'short_url',
  ACCESS_COUNT = 'access_count',  
  CREATED_AT = 'created_at',
}

type CsvColumn = {
  key: CsvColumnKey
  header: string
}

export type Csv = Record<CsvColumnKey, unknown>

const exportLinksUseCaseSchema = z.object({
  originalUrl: z.string().trim().toLowerCase().min(1).optional(),
})

export type ExportLinksUseCaseRequest = z.input<typeof exportLinksUseCaseSchema>

type ExportLinksUseCaseResponse = Either<
  never,
  {
    reportUrl: string
  }
>

export class ExportLinksUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private storageUploader: StorageUploader
  ) {}

  async execute({
    originalUrl,
  }: ExportLinksUseCaseRequest = {}): Promise<ExportLinksUseCaseResponse> {
    // Stream Links from Database
    const stream = this.linksRepository.streamLinks({ originalUrl })

    // CSV Configuration
    const delimiter = ','

    const header = true

    const columns: CsvColumn[] = [
      { key: CsvColumnKey.ID, header: 'ID' },
      { key: CsvColumnKey.ORIGINAL_URL, header: 'URL original' },
      { key: CsvColumnKey.SHORT_URL, header: 'URL encurtada' },
      { key: CsvColumnKey.ACCESS_COUNT, header: 'Contagem de acessos' },
      { key: CsvColumnKey.CREATED_AT, header: 'Criado em' },
    ]

    const csv = stringify({
      delimiter,
      header,
      columns,
    })

    // Upload to Storage Pipeline Configuration
    const uploadToStorageStream = new PassThrough()

    const uploadToStoragePipeline = pipeline(
      stream,
      new Transform({
        objectMode: true,
        transform(chunks: Link[], _, callback) {
          for (const chunk of chunks) {
            this.push(chunk)
          }

          callback()
        },
      }),
      csv,
      uploadToStorageStream
    )

    // Start Upload to Storage
    const folder = StorageUploaderFolder.DOWNLOADS

    const fileName = `${Date.now()}-link.csv`

    const contentType = 'text/csv'

    const contentStream = uploadToStorageStream

    const uploadToStorage = this.storageUploader.upload({
      folder,
      fileName,
      contentType,
      contentStream,
    })

    // Await both upload and pipeline completion
    const [{ url: reportUrl }] = await Promise.all([
      uploadToStorage,
      uploadToStoragePipeline,
    ])

    return right({
      reportUrl,
    })
  }
}
