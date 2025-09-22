import { useLinkStore } from '@/stores/links'
import { getRouteApi } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Divider } from '../divider'
import { EmptyListInfo } from './empty-list-info'
import { MyLinksItem } from './item'

export const MyLinksList = () => {
  const routeApi = getRouteApi('/')
  const data = routeApi.useLoaderData()

  useEffect(() => {
    if (data?.links) {
      useLinkStore.getState().setLinks(data.links)
    }
  }, [data?.links])

  const links = useLinkStore.use.links()

  return (
    <div className="flex flex-col gap-4 max-h-[344px] overflow-y-auto">
      {links.size > 0 ? (
        Array.from(links.values()).map(link => (
          <div key={link.id} className="space-y-4">
            <Divider />
            <MyLinksItem link={link} />
          </div>
        ))
      ) : (
        <EmptyListInfo />
      )}
    </div>
  )
}
