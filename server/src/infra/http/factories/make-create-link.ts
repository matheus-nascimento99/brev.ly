import { CreateLinkUseCase } from '../../../domain/links/application/use-cases/create-link.ts'
import { DrizzleLinksRepository } from '../../database/drizzle/repositories/links.ts'

export const makeCreateLink = () => {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new CreateLinkUseCase(linksRepository)
  return useCase
}
