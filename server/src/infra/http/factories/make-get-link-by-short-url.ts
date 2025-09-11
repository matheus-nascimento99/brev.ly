import { GetLinkByShortUrlUseCase } from '../../../domain/links/application/use-cases/get-link-by-short-url.ts'
import { DrizzleLinksRepository } from '../../database/drizzle/repositories/links.ts'

export const makeGetLinkByShortUrl = () => {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new GetLinkByShortUrlUseCase(linksRepository)
  return useCase
}
