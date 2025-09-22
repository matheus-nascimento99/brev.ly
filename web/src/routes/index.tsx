import { MyLinks } from '@/components/my-links'
import { NewLinkForm } from '@/components/new-link-form'
import { fetchLinks } from '@/http/fetch-links'
import { createFileRoute } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const Route = createFileRoute('/')({
  component: Index,
  loader: async () => {
    try {
      const { links } = await fetchLinks()
      return { links }
    } catch (error) {
      const isAxiosError = error instanceof AxiosError
      const description = isAxiosError
        ? error.response?.data.message
        : 'Não foi possível buscar os links, tente novamente mais tarde.'

      toast.error(description)

      return { links: [] }
    }
  },
})

function Index() {
  return (
    <div className="mt-6 md:mt-8 grid md:grid-cols-3 gap-3 items-start">
      <NewLinkForm />

      <MyLinks />
    </div>
  )
}
