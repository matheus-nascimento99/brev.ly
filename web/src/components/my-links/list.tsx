import { useLinkStore } from '@/stores/links'
import { Divider } from '../divider'
import { EmptyListInfo } from './empty-list-info'
import { MyLinksItem } from './item'

export const MyLinksList = () => {
  const links = useLinkStore.use.links()

  return (
    <div className="flex flex-col gap-4 max-h-[344px] overflow-y-auto">
      {links.size > 0 ? (
        Array.from(links.values()).map(link => (
          <>
            <Divider />
            <MyLinksItem link={link} />
          </>
        ))
      ) : (
        <EmptyListInfo />
      )}
    </div>
  )
}
