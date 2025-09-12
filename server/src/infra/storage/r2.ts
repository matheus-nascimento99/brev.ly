import { S3Client } from "@aws-sdk/client-s3";
import { 
  StorageUploader, 
  StorageUploaderRequest,
  storageUploaderRequestSchema,
  StorageUploaderResponse, 
  storageUploaderResponseSchema
} from "../../domain/links/application/storage/storage-uploader";
import { env } from "../env";
import { Upload } from "@aws-sdk/lib-storage";
import { randomUUID } from "node:crypto";
import { basename, extname } from "node:path";

export class R2Storage implements StorageUploader {
  private readonly client: S3Client

  constructor() {
    this.client = new S3Client({
      region: 'auto',
      endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: env.CLOUDFLARE_SECRET_ACCESS_KEY,
      },
    });
  }

  async upload(request: StorageUploaderRequest): Promise<StorageUploaderResponse> {
    const {
      folder,
      fileName,
      contentType,
      contentStream
    } = storageUploaderRequestSchema.parse(request)

    const fileNameExtension = extname(fileName)
    const fileNameWithoutExtension = basename(fileName, fileNameExtension)

    const sanitizedFileName = fileNameWithoutExtension.replace(
      /[^a-zA-Z0-9]/g,
      ''
    )
    const sanitizedFileNameWithExtension =
      sanitizedFileName.concat(fileNameExtension)

    const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`

    const upload = new Upload({
      client: this.client,
      params: {
        Key: uniqueFileName,
        Bucket: env.CLOUDFLARE_BUCKET,
        Body: contentStream,
        ContentType: contentType,
      },
    })

    await upload.done()

    return storageUploaderResponseSchema.parse({
      key: uniqueFileName,
      url: `${env.CLOUDFLARE_PUBLIC_URL}/${uniqueFileName}`,
    })
  }
}