import { UseCaseError } from '@/core/errors/use-case'

export class LinkWithShortUrlAlreadyExistsError extends UseCaseError {
  constructor(shortUrl: string) {
    super(`Link com url curta "${shortUrl}" já existe.`)
  }
}
