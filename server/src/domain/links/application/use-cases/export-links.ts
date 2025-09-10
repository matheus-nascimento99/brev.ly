import { stringify } from 'csv-stringify'
import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { type Either, right } from '../../../../core/errors/either'
import type { Link } from '../../enterprise/entities/link.ts'
import type { LinksRepository } from '../repositories/links.ts'
import {
  type StorageUploader,
  StorageUploaderFolder,
} from '../storage/storage-uploader'

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

  async execute(): Promise<ExportLinksUseCaseResponse> {
    // Stream Links from Database
    const stream = this.linksRepository.streamLinks()

    // CSV Configuration
    const delimiter = ','

    const header = true

    const columns = [
      { key: 'id', header: 'ID' },
      { key: 'original_url', header: 'URL original' },
      { key: 'short_url', header: 'URL encurtada' },
      { key: 'created_at', header: 'Criado em' },
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
