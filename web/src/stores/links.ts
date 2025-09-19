import type { Link } from '@/dtos/link'
import { createSelectors } from '@/utils/create-selectors'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface LinkState {
  links: Map<string, Link>
}

const useLinkStoreBase = create<LinkState>()(
  immer(() => {
    return {
      links: new Map(),
    }
  })
)

export const useLinkStore = createSelectors(useLinkStoreBase)
