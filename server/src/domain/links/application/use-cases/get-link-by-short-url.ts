import { type Either, left, right } from '@/core/errors/either'
import z from 'zod'
import type { Link } from '../../enterprise/entities/link'
import { Raw } from '../../enterprise/value-objects/raw'
import type { LinksRepository } from '../repositories/links'
import { ResourceNotFoundError } from './errors/resource-not-found'

const getLinkByShortUrlUseCaseSchema = z.object({
  shortUrl: z.string().min(1, 'Informe a URL encurtada.'),
})

type GetLinkByShortUrlUseCaseRequest = z.input<
  typeof getLinkByShortUrlUseCaseSchema
>

type GetLinkByShortUrlUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    link: Link
  }
>

export class GetLinkByShortUrlUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute(
    request: GetLinkByShortUrlUseCaseRequest
  ): Promise<GetLinkByShortUrlUseCaseResponse> {
    const { shortUrl: originalShortUrl } =
      getLinkByShortUrlUseCaseSchema.parse(request)

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
