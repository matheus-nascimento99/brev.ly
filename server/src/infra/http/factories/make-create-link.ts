import { CreateLinkUseCase } from "@/domain/links/application/use-cases/create-link"
import { DrizzleLinksRepository } from "@/infra/database/drizzle/repositories/links"

export const makeCreateLink = () => {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new CreateLinkUseCase(linksRepository)
  return useCase
}