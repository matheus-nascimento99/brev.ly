import type { Readable } from 'node:stream'

export enum StorageUploaderFolder {
  DOWNLOADS = 'downloads',
  REPORTS = 'reports',
}

export type StorageUploaderRequest = {
  folder: StorageUploaderFolder
  contentType: string
  fileName: string
  contentStream: Readable
}

export type StorageUploaderResponse = {
  key: string
  url: string
}

export abstract class StorageUploader {
  abstract upload(
    request: StorageUploaderRequest
  ): Promise<StorageUploaderResponse>
}
