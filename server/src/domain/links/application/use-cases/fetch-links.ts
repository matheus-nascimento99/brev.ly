import { type Either, right } from '../../../../core/errors/either'
import type { Link } from '../../enterprise/entities/link.ts'
import type { LinksRepository } from '../repositories/links.ts'

type FetchLinksUseCaseResponse = Either<
  never,
  {
    links: Link[]
  }
>

export class FetchLinksUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute(): Promise<FetchLinksUseCaseResponse> {
    const links = await this.linksRepository.findMany()

    return right({ links })
  }
}
