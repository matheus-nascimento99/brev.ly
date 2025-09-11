import z from 'zod'
import { type Either, left, right } from '../../../../core/errors/either'
import { Link } from '../../enterprise/entities/link.ts'
import { Raw } from '../../enterprise/value-objects/raw.ts'
import type { LinksRepository } from '../repositories/links.ts'
import { LinkWithShortUrlAlreadyExistsError } from './errors/link-with-short-url-already-exists.ts'

const createLinkUseCaseSchema = z.object({
  originalUrl: z.url({ error: 'URL inválida.' }).trim().toLowerCase(),
  shortUrl: z.string().min(1, 'Informe a URL encurtada.').trim().toLowerCase(),
})

export type CreateLinkUseCaseRequest = z.input<typeof createLinkUseCaseSchema>

export type CreateLinkUseCaseResponse = Either<
  LinkWithShortUrlAlreadyExistsError,
  unknown
>

export class CreateLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute(
    request: CreateLinkUseCaseRequest
  ): Promise<CreateLinkUseCaseResponse> {
    const { originalUrl, shortUrl: originalShortUrl } =
      createLinkUseCaseSchema.parse(request)

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
