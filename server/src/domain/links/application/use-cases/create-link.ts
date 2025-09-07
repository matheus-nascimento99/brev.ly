import { type Either, left, right } from '@/core/errors/either'
import { Link } from '../../enterprise/entities/link'
import { Raw } from '../../enterprise/value-objects/raw'
import type { LinksRepository } from '../repositories/links'
import { LinkWithShortUrlAlreadyExistsError } from './errors/link-with-short-url-already-exists'

export type CreateLinkUseCaseRequest = {
  originalUrl: string
  shortUrl: string
}

export type CreateLinkUseCaseResponse = Either<
  LinkWithShortUrlAlreadyExistsError,
  unknown
>

export class CreateLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    originalUrl,
    shortUrl: originalShortUrl,
  }: CreateLinkUseCaseRequest): Promise<CreateLinkUseCaseResponse> {
    const shortUrl = Raw.create(originalShortUrl)

    const linkByShortUrl = await this.linksRepository.findByShortUrl(shortUrl)

    if (linkByShortUrl) {
      return left(new LinkWithShortUrlAlreadyExistsError(originalShortUrl))
    }

    const link = Link.create({
      originalUrl,
      shortUrl,
    })

    await this.linksRepository.create(link)

    return right({})
  }
}
