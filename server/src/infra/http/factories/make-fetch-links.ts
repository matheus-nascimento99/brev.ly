import { FetchLinksUseCase } from '../../../domain/links/application/use-cases/fetch-links.ts'
import { DrizzleLinksRepository } from '../../database/drizzle/repositories/links.ts'

export const makeFetchLinks = () => {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new FetchLinksUseCase(linksRepository)
  return useCase
}
