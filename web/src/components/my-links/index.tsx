import { TopLoadingBar } from '../top-loading-bar'
import { MyLinksHeader } from './header'
import { MyLinksList } from './list'

export const MyLinks = () => {
  return (
    <section className="bg-white rounded-lg space-y-5 col-span-2 overflow-hidden relative p-6">
      <TopLoadingBar />

      <MyLinksHeader />

      <MyLinksList />
    </section>
  )
}
