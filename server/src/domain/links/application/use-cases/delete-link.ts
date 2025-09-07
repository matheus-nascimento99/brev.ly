import { type Either, left, right } from '@/core/errors/either'
import { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import type { LinksRepository } from '../repositories/links'
import { ResourceNotFoundError } from './errors/resource-not-found'

type DeleteLinkUseCaseRequest = {
  linkId: string
}

type DeleteLinkUseCaseResponse = Either<ResourceNotFoundError, unknown>

export class DeleteLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute({
    linkId,
  }: DeleteLinkUseCaseRequest): Promise<DeleteLinkUseCaseResponse> {
    const link = await this.linksRepository.findById(new UniqueEntityId(linkId))

    if (!link) {
      return left(new ResourceNotFoundError('link', linkId))
    }

    await this.linksRepository.delete(link.id)

    return right({})
  }
}
