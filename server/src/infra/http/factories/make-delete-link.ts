import { DeleteLinkUseCase } from '../../../domain/links/application/use-cases/delete-link.ts'
import { DrizzleLinksRepository } from '../../database/drizzle/repositories/links.ts'

export const makeDeleteLink = () => {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new DeleteLinkUseCase(linksRepository)
  return useCase
}
