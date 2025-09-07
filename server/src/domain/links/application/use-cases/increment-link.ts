import { type Either, left, right } from '@/core/errors/either'
import { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import type { LinksRepository } from '../repositories/links'
import { ResourceNotFoundError } from './errors/resource-not-found'

type IncrementLinkUseCaseRequest = {
  linkId: string
}

type IncrementLinkUseCaseResponse = Either<ResourceNotFoundError, unknown>

export class IncrementLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    linkId,
  }: IncrementLinkUseCaseRequest): Promise<IncrementLinkUseCaseResponse> {
    const link = await this.linksRepository.findById(new UniqueEntityId(linkId))

    if (!link) {
      return left(new ResourceNotFoundError('link', linkId))
    }

    link.increment()

    await this.linksRepository.save(link.id, link)

    return right({})
  }
}
