import { api } from '@/lib/axios'

type DeleteLinkRequest = {
  linkId: string
}

export const deleteLink = async ({ linkId }: DeleteLinkRequest) => {
  await api.delete(`/links/${linkId}`)
}
