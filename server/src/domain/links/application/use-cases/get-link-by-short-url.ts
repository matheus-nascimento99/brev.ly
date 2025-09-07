import { type Either, left, right } from '@/core/errors/either'
import type { Link } from '../../enterprise/entities/link'
import { Raw } from '../../enterprise/value-objects/raw'
import type { LinksRepository } from '../repositories/links'
import { ResourceNotFoundError } from './errors/resource-not-found'

type GetLinkByShortUrlUseCaseRequest = {
  shortUrl: string
}

type GetLinkByShortUrlUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    link: Link
  }
>

export class GetLinkByShortUrlUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    shortUrl: originalShortUrl,
  }: GetLinkByShortUrlUseCaseRequest): Promise<GetLinkByShortUrlUseCaseResponse> {
    const shortUrl = Raw.createFromText(originalShortUrl)

    const link = await this.linksRepository.findByShortUrl(shortUrl)

    if (!link) {
      return left(new ResourceNotFoundError('link', originalShortUrl))
    }

    return right({
      link,
    })
  }
}
