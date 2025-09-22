import { useLinkStore } from '@/stores/links'
import { TopLoadingBar } from '../top-loading-bar'
import { MyLinksHeader } from './header'
import { MyLinksList } from './list'

export const MyLinks = () => {
  const isLoading = useLinkStore.use.isLoading()

  return (
    <section className="bg-white rounded-lg space-y-5 col-span-2 overflow-hidden relative p-6">
      {isLoading && <TopLoadingBar />}

      <MyLinksHeader />

      <MyLinksList />
    </section>
  )
}
