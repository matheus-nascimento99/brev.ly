import { api } from '@/lib/axios'

type ExportLinksResponse = {
  report_url: string
}

export const exportLinks = async () => {
  const result = await api.post<ExportLinksResponse>(`/links/exports`)

  return {
    reportUrl: result.data.report_url,
  }
}
