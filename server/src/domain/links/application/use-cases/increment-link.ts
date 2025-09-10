import z from 'zod'
import { type Either, left, right } from '../../../../core/errors/either'
import { UniqueEntityId } from '../../../../core/value-objects/unique-entity-id.ts'
import type { LinksRepository } from '../repositories/links.ts'
import { ResourceNotFoundError } from './errors/resource-not-found.ts'

const incrementLinkUseCaseRequestSchema = z.object({
  linkId: z.uuid({ error: 'ID do link inválido.' }),
})

type IncrementLinkUseCaseRequest = z.input<
  typeof incrementLinkUseCaseRequestSchema
>

type IncrementLinkUseCaseResponse = Either<ResourceNotFoundError, unknown>

export class IncrementLinkUseCase {
  constructor(private linksRepository: LinksRepository) {}

  async execute(
    request: IncrementLinkUseCaseRequest
  ): Promise<IncrementLinkUseCaseResponse> {
    const { linkId } = incrementLinkUseCaseRequestSchema.parse(request)

    const link = await this.linksRepository.findById(new UniqueEntityId(linkId))

    if (!link) {
      return left(new ResourceNotFoundError('link', linkId))
    }

    link.increment()

    await this.linksRepository.save(link.id, link)

    return right({})
  }
}
