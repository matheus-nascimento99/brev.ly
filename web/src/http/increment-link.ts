import { api } from '@/lib/axios'

type IncrementLinkRequest = {
  linkId: string
}

export const incrementLink = async ({ linkId }: IncrementLinkRequest) => {
  await api.patch(`/links/${linkId}/increments`)
}
