import { faker } from '@faker-js/faker'
import { makeLink } from '../../../../../test/factories/make-link.ts'
import { InMemoryLinksRepository } from '../../../../../test/in-memory/links.ts'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { GetLinkByShortUrlUseCase } from './get-link-by-short-url'

let inMemoryLinksRepository: InMemoryLinksRepository
let sut: GetLinkByShortUrlUseCase

describe('Get link by short url use case', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository()

    sut = new GetLinkByShortUrlUseCase(inMemoryLinksRepository)
  })

  it('should be able to get link by short url', async () => {
    const link = makeLink({})
    inMemoryLinksRepository.create(link)

    const result = await sut.execute({ shortUrl: link.shortUrl.value })

    expect(result.isRight()).toEqual(true)
    expect(result.value).toEqual({
      link: expect.objectContaining({ id: link.id }),
    })
  })

  it('should not be able to get link by a non-existent short url', async () => {
    const result = await sut.execute({
      shortUrl: faker.lorem.word(),
    })

    expect(result.isLeft()).toEqual(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
