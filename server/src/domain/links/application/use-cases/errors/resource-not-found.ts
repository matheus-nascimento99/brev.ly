import { UseCaseError } from '../../../../../core/errors/use-case.ts'

export class ResourceNotFoundError extends UseCaseError {
  constructor(
    public resource: string,
    public resourceId: string
  ) {
    super(`Recurso "${resource}" com ID "${resourceId}" não foi encontrado.`)
  }
}
