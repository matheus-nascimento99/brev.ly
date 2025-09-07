import {
  type StorageUploader,
  type StorageUploaderRequest,
  type StorageUploaderResponse,
  storageUploaderRequestSchema,
  storageUploaderResponseSchema,
} from '@/domain/links/application/storage/storage-uploader'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'
import { basename, extname } from 'node:path'

export class FakeStorage implements StorageUploader {
  public files: Map<string, Buffer> = new Map()

  async upload(
    request: StorageUploaderRequest
  ): Promise<StorageUploaderResponse> {
    const { folder, fileName, contentStream } =
      storageUploaderRequestSchema.parse(request)

    const chunks: Buffer[] = []

    for await (const chunk of contentStream) {
      chunks.push(chunk)
    }

    const fileNameExtension = extname(fileName)
    const fileNameWithoutExtension = basename(fileName, fileNameExtension)

    const sanitizedFileName = fileNameWithoutExtension.replace(
      /[^a-zA-Z0-9]/g,
      ''
    )

    const sanitizedFileNameWithExtension =
      sanitizedFileName.concat(fileNameExtension)

    const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`

    this.files.set(uniqueFileName, Buffer.concat(chunks))

    return storageUploaderResponseSchema.parse({
      url: `${faker.internet.url()}/${uniqueFileName}`,
      key: uniqueFileName,
    })
  }
}
