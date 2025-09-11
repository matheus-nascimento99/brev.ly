import z from 'zod'
import { type Either, right } from '../../../../core/errors/either'
import type { Link } from '../../enterprise/entities/link.ts'
import type { LinksRepository } from '../repositories/links.ts'

const fetchLinksUseCaseSchema = z.object({
  originalUrl: z.string().trim().toLowerCase().min(1).optional(),
})

export type FetchLinksUseCaseRequest = z.input<typeof fetchLinksUseCaseSchema>

type FetchLinksUseCaseResponse = Either<
  never,
  {
    links: Link[]
  }
>

export class FetchLinksUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    originalUrl,
  }: FetchLinksUseCaseRequest): Promise<FetchLinksUseCaseResponse> {
    const links = await this.linksRepository.findMany({ originalUrl })

    return right({ links })
  }
}
