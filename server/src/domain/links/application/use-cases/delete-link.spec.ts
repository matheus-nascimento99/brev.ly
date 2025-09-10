import { faker } from '@faker-js/faker'
import { makeLink } from '../../../../../test/factories/make-link.ts'
import { InMemoryLinksRepository } from '../../../../../test/in-memory/links.ts'
import { DeleteLinkUseCase } from './delete-link'
import { ResourceNotFoundError } from './errors/resource-not-found'

let inMemoryLinksRepository: InMemoryLinksRepository
let sut: DeleteLinkUseCase

describe('Delete link use case', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository()
    sut = new DeleteLinkUseCase(inMemoryLinksRepository)
  })

  it('should be able to delete an link', async () => {
    const link = makeLink({})
    inMemoryLinksRepository.create(link)

    const result = await sut.execute({
      linkId: link.id.toString(),
    })

    expect(result.isRight()).toEqual(true)
    expect(inMemoryLinksRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an unexistent link', async () => {
    const result = await sut.execute({
      linkId: faker.string.uuid(),
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
