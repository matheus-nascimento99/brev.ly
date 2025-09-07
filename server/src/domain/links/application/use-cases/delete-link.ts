import { type Either, left, right } from '@/core/errors/either'
import { UniqueEntityId } from '@/core/value-objects/unique-entity-id'
import z from 'zod'
import type { LinksRepository } from '../repositories/links'
import { ResourceNotFoundError } from './errors/resource-not-found'

const deleteLinkUseCaseSchema = z.object({
  linkId: z.uuid({ error: 'ID do link inválido.' }),
})

type DeleteLinkUseCaseRequest = z.input<typeof deleteLinkUseCaseSchema>

type DeleteLinkUseCaseResponse = Either<ResourceNotFoundError, unknown>

export class DeleteLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute(
    request: DeleteLinkUseCaseRequest
  ): Promise<DeleteLinkUseCaseResponse> {
    const { linkId } = deleteLinkUseCaseSchema.parse(request)

    const link = await this.linksRepository.findById(new UniqueEntityId(linkId))

    if (!link) {
      return left(new ResourceNotFoundError('link', linkId))
    }

    await this.linksRepository.delete(link.id)

    return right({})
  }
}
