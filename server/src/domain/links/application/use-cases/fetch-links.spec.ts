import { makeLink } from '../../../../../test/factories/make-link'
import { InMemoryLinksRepository } from '../../../../../test/in-memory/links'
import { FetchLinksUseCase } from './fetch-links'

let inMemoryLinksRepository: InMemoryLinksRepository

let sut: FetchLinksUseCase

describe('Fetch links use case', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository()
    sut = new FetchLinksUseCase(inMemoryLinksRepository)
  })

  it('should be able to fetch links', async () => {
    inMemoryLinksRepository.create(
      makeLink({ createdAt: new Date(2023, 1, 1) })
    )
    inMemoryLinksRepository.create(
      makeLink({ createdAt: new Date(2023, 1, 2) })
    )
    inMemoryLinksRepository.create(
      makeLink({ createdAt: new Date(2023, 1, 3) })
    )
    inMemoryLinksRepository.create(
      makeLink({ createdAt: new Date(2023, 1, 4) })
    )

    const result = await sut.execute()

    expect(result.isRight()).toEqual(true)
    expect(result.value.links).toHaveLength(4)
    expect(result.value.links).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 1, 4) }),
      expect.objectContaining({ createdAt: new Date(2023, 1, 3) }),
      expect.objectContaining({ createdAt: new Date(2023, 1, 2) }),
      expect.objectContaining({ createdAt: new Date(2023, 1, 1) }),
    ])
  })
})
