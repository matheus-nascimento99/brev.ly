import { MyLinks } from '@/components/my-links'
import { NewLinkForm } from '@/components/new-link-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="mt-6 md:mt-8 grid md:grid-cols-3 gap-3 items-start">
      <NewLinkForm />

      <MyLinks />
    </div>
  )
}
