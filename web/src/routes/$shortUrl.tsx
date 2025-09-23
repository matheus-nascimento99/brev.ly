import { NotFound } from '@/components/not-found'
import { getLinkByShortUrl } from '@/http/get-link-by-short-url'
import { incrementLink } from '@/http/increment-link'
import { useLinkStore } from '@/stores/links'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/$shortUrl')({
  component: LinkRedirect,
  notFoundComponent: NotFound,

  loader: async ({ params }) => {
    try {
      const result = await getLinkByShortUrl({ shortUrl: params.shortUrl })
      return result.link
    } catch (error) {
      console.error('Error fetching link:', error)
      throw notFound()
    }
  },
})

function LinkRedirect() {
  const updateLink = useLinkStore.use.updateLink()

  const response = Route.useLoaderData()

  useEffect(() => {
    async function fetchAndRedirect() {
      try {
        const { link } = await incrementLink({ linkId: response.id })

        updateLink(link.id, link)

        // redireciona o usuário após 3 segundos sem permitir voltar
        const timeoutId = setTimeout(() => {
          window.location.replace(link.original_url)
        }, 3000)

        // boa prática: limpa o timeout se o componente desmontar
        return () => clearTimeout(timeoutId)
      } catch (err) {
        console.error('Erro na requisição:', err)

        const isAxiosError = err instanceof AxiosError
        const description =
          isAxiosError && err.response?.data?.message
            ? err.response.data.message
            : 'Não foi possível acessar o link, tente novamente mais tarde.'

        toast.error(description)
      }
    }

    fetchAndRedirect()
  }, [response.id, updateLink])

  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-gray-100 py-16 px-12 my-auto mx-auto md:max-w-[580px] rounded-xl">
      <img src="/logo-icon.svg" alt="logo" className="h-12" />

      <span className="text-xl text-gray-600 text-center">
        Redirecionando...
      </span>

      <p className="text-md text-gray-500 text-center">
        O link será aberto automaticamente em alguns instantes. <br />
        Não foi redirecionado?{' '}
        <Link
          to={response.original_url}
          className="text-md-semibold text-blue-base hover:underline"
          replace={true}
        >
          Acesse aqui
        </Link>
      </p>
    </div>
  )
}
