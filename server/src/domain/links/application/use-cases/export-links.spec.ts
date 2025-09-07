import { makeLink } from '../../../../../test/factories/make-link'
import { InMemoryLinksRepository } from '../../../../../test/in-memory/links'
import { FakeStorage } from '../../../../../test/storage/fake-storage'
import { ExportLinksUseCase } from './export-links'

let inMemoryLinksRepository: InMemoryLinksRepository
let fakeStorage: FakeStorage

let sut: ExportLinksUseCase

describe('Export links use case', () => {
  beforeEach(() => {
    inMemoryLinksRepository = new InMemoryLinksRepository()
    fakeStorage = new FakeStorage()
    sut = new ExportLinksUseCase(inMemoryLinksRepository, fakeStorage)
  })

  it('should be able to export links', async () => {
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
    expect(result.value.reportUrl).toEqual(expect.any(String))
    expect(fakeStorage.files).toHaveLength(1)
  })
})
