import { LinksList } from '@/components/links-list'
import { NewLinkForm } from '@/components/new-link-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="mt-6 lg:mt-8 grid grid-rows-2 lg:grid-cols-2 gap-3">
      <NewLinkForm />

      <LinksList />
    </div>
  )
}
