import type { Link as LinkItem } from '@/dtos/link'
import { deleteLink } from '@/http/delete-link'
import { useLinkStore } from '@/stores/links'
import { CopyIcon, TrashIcon } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { Button } from '../button'

type MyLinksItemProps = {
  link: LinkItem
}

export const MyLinksItem = ({ link }: MyLinksItemProps) => {
  const deleteLinkFromStore = useLinkStore.use.deleteLink()

  const handleCopyToClipboard = async () => {
    try {
      const url = new URL(window.location.href)
      url.pathname = `/${link.short_url}`

      await navigator.clipboard.writeText(String(url))

      toast.success(
        `Link "${link.short_url}" copiado para a área de transferência!`
      )
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      toast.error('Falha ao copiar o link.')
    }
  }

  const handleDeleteLink = async () => {
    if (!confirm('Tem certeza que deseja excluir este link?')) {
      return
    }

    try {
      await deleteLink({ linkId: link.id })

      deleteLinkFromStore(link.id)

      toast.success(`Link "${link.short_url}" excluído com sucesso!`)
    } catch (error) {
      console.error('Error deleting link:', error)

      const isAxiosError = error instanceof AxiosError
      const description =
        isAxiosError && error.response?.data?.message
          ? error.response.data.message
          : 'Não foi possível criar o link, tente novamente mais tarde.'

      toast.error(description)
    }
  }

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
        <Button
          variant="secondary"
          iconOnly
          size="sm"
          onClick={() => handleCopyToClipboard()}
        >
          <CopyIcon className="size-4 text-gray-600" />
        </Button>
        <Button
          variant="secondary"
          iconOnly
          size="sm"
          onClick={() => handleDeleteLink()}
        >
          <TrashIcon className="size-4 text-gray-600" />
        </Button>
      </div>
    </div>
  )
}
