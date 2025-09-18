import { LinksList } from '@/components/links-list'
import { NewLinkForm } from '@/components/new-link-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="mt-6 md:mt-8 grid md:grid-cols-2 gap-3">
      <NewLinkForm />

      <LinksList />
    </div>
  )
}
