import { Header } from '@/components/header'
import { MyLinks } from '@/components/my-links'
import { NewLinkForm } from '@/components/new-link-form'
import { fetchLinks } from '@/http/fetch-links'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
  loader: async () => {
    try {
      const { links } = await fetchLinks()
      return { links }
    } catch (error) {
      console.error('Error fetching links:', error)
      return { links: [] }
    }
  },
})

function Index() {
  const router = useRouter()

  // Recarrega quando a aba ganhar foco
  useEffect(() => {
    const onFocus = () => {
      router.invalidate()
    }

    window.addEventListener('focus', onFocus)

    return () => {
      window.removeEventListener('focus', onFocus)
    }
  }, [router])

  // Recarrega a cada 10 segundos se a aba estiver em foco
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.hasFocus()) {
        router.invalidate()
      }
    }, 10000)
    return () => clearInterval(interval)
  }, [router])

  return (
    <div>
      <Header />
      <div className="mt-6 md:mt-8 grid md:grid-cols-3 gap-3 items-start">
        <NewLinkForm />
        <MyLinks />
      </div>
    </div>
  )
}
