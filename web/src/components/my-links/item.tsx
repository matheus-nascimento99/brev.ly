import type { Link as LinkItem } from '@/dtos/link'
import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { Button } from '../button'

type MyLinksItemProps = {
  link: LinkItem
}

export const MyLinksItem = ({ link }: MyLinksItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <Link
          to={`/$shortUrl`}
          params={{ shortUrl: link.short_url }}
          target="_blank"
          className="block w-full truncate text-md-semibold text-blue-base hover:underline cursor-pointer"
        >
          brev.ly/{link.short_url}
        </Link>
        <span className="block w-full truncate text-sm text-gray-500">
          {link.original_url}
        </span>
      </div>

      <span className="text-sm text-gray-500">{link.access_count} acessos</span>

      <div className="flex flex-row gap-1">
        <Button variant="secondary" iconOnly size="sm">
          <CopyIcon className="size-4 text-gray-600" />
        </Button>
        <Button variant="secondary" iconOnly size="sm">
          <TrashIcon className="size-4 text-gray-600" />
        </Button>
      </div>
    </div>
  )
}
