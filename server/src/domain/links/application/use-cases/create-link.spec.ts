import { fakerPT_BR as faker } from '@faker-js/faker'
import { makeLink } from '../../../../../test/factories/link'
import { InMemoryLinksRepository } from '../../../../../test/in-memory/links'
import { CreateLinkUseCase } from './create-link'
import { LinkWithShortUrlAlreadyExistsError } from './errors/link-with-short-url-already-exists'

let inMemoryLinksRepository: InMemoryLinksRepository

let sut: CreateLinkUseCase

describe('Create link use case', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository()
    sut = new CreateLinkUseCase(inMemoryLinksRepository)
  })

  it('should be able to create a link', async () => {
    const result = await sut.execute({
      originalUrl: faker.internet.url(),
      shortUrl: faker.person.firstName().toLowerCase(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryLinksRepository.items).toHaveLength(1)
  })

  it('should not be able to create a link with same short url of another link', async () => {
    const link = makeLink()
    inMemoryLinksRepository.create(link)

    const result = await sut.execute({
      originalUrl: faker.internet.url(),
      shortUrl: link.shortUrl.value,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(LinkWithShortUrlAlreadyExistsError)
  })
})
