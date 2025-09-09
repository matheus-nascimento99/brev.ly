import { CreateLinkUseCase } from "@/domain/links/application/use-cases/create-link"

export const makeCreateLink = () => {
  const linksRepository = new DrizzleLinksRepository()
  const useCase = new CreateLinkUseCase(linksRepository)
}