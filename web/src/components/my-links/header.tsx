import { useLinkStore } from '@/stores/links'
import { DownloadSimpleIcon } from '@phosphor-icons/react'
import { Button } from '../button'

export const MyLinksHeader = () => {
  const links = useLinkStore.use.links()
  const hasLinks = links.size > 0

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg text-gray-600">My Links</h2>

      <Button
        variant="secondary"
        fullWidth={false}
        size="sm"
        disabled={!hasLinks}
      >
        <DownloadSimpleIcon className="size-4 text-gray-600" />
        Baixar CSV
      </Button>
    </div>
  )
}
