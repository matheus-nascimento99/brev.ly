import { faker } from '@faker-js/faker'
import { makeLink } from '../../../../../test/factories/make-link.ts'
import { InMemoryLinksRepository } from '../../../../../test/in-memory/links.ts'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { IncrementLinkUseCase } from './increment-link'

let inMemoryLinksRepository: InMemoryLinksRepository

let sut: IncrementLinkUseCase

describe('Increment link use case', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository()

    sut = new IncrementLinkUseCase(inMemoryLinksRepository)
  })

  it('should be able to increment link', async () => {
    const link = makeLink()
    inMemoryLinksRepository.create(link)

    const result = await sut.execute({
      linkId: link.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(
      Array.from(inMemoryLinksRepository.items.values())[0].accessCount
    ).toBe(1)
  })

  it('should not be able to increment a non-existent link', async () => {
    const result = await sut.execute({
      linkId: faker.string.uuid(),
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
