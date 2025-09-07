import { Readable } from 'node:stream'
import z from 'zod'

export enum StorageUploaderFolder {
  DOWNLOADS = 'downloads',
  REPORTS = 'reports',
}

export const storageUploaderRequestSchema = z.object({
  folder: z.enum(StorageUploaderFolder, { error: 'Diretório inválido.' }),
  contentType: z.string().min(1, 'Informe o tipo do arquivo.'),
  fileName: z.string().min(1, 'Informe o nome do arquivo.'),
  contentStream: z.instanceof(Readable, {
    error: 'Stream deve ser do tipo Readable.',
  }),
})

export const storageUploaderResponseSchema = z.object({
  key: z.string().min(1, 'Informe o nome único do arquivo.'),
  url: z.url({ error: 'URL inválida.' }),
})

export type StorageUploaderRequest = z.input<
  typeof storageUploaderRequestSchema
>

export type StorageUploaderResponse = z.input<
  typeof storageUploaderResponseSchema
>

export abstract class StorageUploader {
  abstract upload(
    request: StorageUploaderRequest
  ): Promise<StorageUploaderResponse>
}
