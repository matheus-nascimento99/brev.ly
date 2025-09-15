import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$shortUrl')({
  component: PostComponent,
})

function PostComponent() {
  // In a component!
  const { shortUrl } = Route.useParams()

  return <div>Short url: {shortUrl}</div>
}
