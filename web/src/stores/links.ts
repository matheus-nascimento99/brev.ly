import type { Link } from '@/dtos/link'
import { createSelectors } from '@/utils/create-selectors'
import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface LinkState {
  // Global links state
  links: Map<string, Link>

  // Global links action state
  setLinks: (links: Link[]) => void
  addLink: (link: Link) => void
  deleteLink: (linkId: string) => void
  updateLink: (linkId: string, link: Link) => void

  // Global links UI state
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

enableMapSet()

const useLinkStoreBase = create<LinkState>()(
  immer(set => {
    const setLinks = (links: Link[]) =>
      set(state => {
        state.links.clear()
        links.forEach(link => {
          state.links.set(link.id, link)
        })
      })

    const addLink = (link: Link) =>
      set(state => {
        // sort links by createdAt date descending
        state.links.set(link.id, link)

        state.links = new Map(
          Array.from(state.links.entries()).sort(
            ([, a], [, b]) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
        )
      })

    const deleteLink = (linkId: string) =>
      set(state => {
        state.links.delete(linkId)
      })

    const updateLink = (linkId: string, link: Link) =>
      set(state => {
        state.links = new Map(state.links).set(linkId, link)
      })

    const setIsLoading = (value: boolean) =>
      set(state => {
        state.isLoading = value
      })

    return {
      links: new Map(),
      setLinks,
      addLink,
      deleteLink,
      updateLink,
      setIsLoading,
      isLoading: false,
    }
  })
)

export const useLinkStore = createSelectors(useLinkStoreBase)
