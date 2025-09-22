import type { Link } from '@/dtos/link'
import { createSelectors } from '@/utils/create-selectors'
import { enableMapSet } from 'immer'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface LinkState {
  // Global state
  links: Map<string, Link>

  // Global action state
  setLinks: (links: Link[]) => void
  addLink: (link: Link) => void
  deleteLink: (linkId: string) => void
  updateLink: (linkId: string, link: Link) => void
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
        state.links.set(link.id, link)
      })

    const deleteLink = (linkId: string) =>
      set(state => {
        state.links.delete(linkId)
      })

    const updateLink = (linkId: string, link: Link) =>
      set(state => {
        state.links.set(linkId, link)
      })

    return {
      links: new Map(),
      setLinks,
      addLink,
      deleteLink,
      updateLink,
    }
  })
)

export const useLinkStore = createSelectors(useLinkStoreBase)
