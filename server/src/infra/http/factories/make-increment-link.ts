import { IncrementLinkUseCase } from '../../../domain/links/application/use-cases/increment-link.ts'
import { DrizzleLinksRepository } from '../../database/drizzle/repositories/links.ts'

export const makeIncrementLink = () => {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new IncrementLinkUseCase(linksRepository)
  return useCase
}
