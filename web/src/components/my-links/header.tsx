import { exportLinks } from '@/http/export-links'
import { useLinkStore } from '@/stores/links'
import { downloadUrl } from '@/utils/download-url'
import { DownloadSimpleIcon, SpinnerIcon } from '@phosphor-icons/react'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../button'

export const MyLinksHeader = () => {
  const [isDownloading, setIsDownloading] = useState(false)

  const links = useLinkStore.use.links()
  const hasLinks = links.size > 0

  const handleDownloadCSV = async () => {
    try {
      setIsDownloading(true)

      const { reportUrl } = await exportLinks()

      await downloadUrl(reportUrl)
    } catch (error) {
      console.error('Error exporting links:', error)

      const isAxiosError = error instanceof AxiosError
      const description =
        isAxiosError && error.response?.data?.message
          ? error.response.data.message
          : 'Não foi possível criar o link, tente novamente mais tarde.'

      toast.error(description)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg text-gray-600">Meus links</h2>

      <Button
        variant="secondary"
        fullWidth={false}
        size="sm"
        disabled={!hasLinks}
        onClick={handleDownloadCSV}
      >
        {isDownloading ? (
          <SpinnerIcon className="size-4 text-gray-600 animate-spin" />
        ) : (
          <DownloadSimpleIcon className="size-4 text-gray-600" />
        )}
        Baixar CSV
      </Button>
    </div>
  )
}
