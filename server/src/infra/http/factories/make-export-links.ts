import { ExportLinksUseCase } from '../../../domain/links/application/use-cases/export-links.ts'
import { DrizzleLinksRepository } from '../../database/drizzle/repositories/links.ts'
import { R2Storage } from '../../storage/r2.ts'

export const makeExportLinks = () => {
  const linksRepository = new DrizzleLinksRepository()
  const storageUploader = new R2Storage()
  const useCase = new ExportLinksUseCase(linksRepository, storageUploader)
  return useCase
}
