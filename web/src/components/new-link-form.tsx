/** biome-ignore-all lint/correctness/useUniqueElementIds: not necessary */

import { createLink } from '@/http/create-link'
import { useLinkStore } from '@/stores/links'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from './button'
import Input from './input'

// ✅ Definição do schema com Zod
const newLinkSchema = z.object({
  originalUrl: z
    .url('Digite uma URL válida')
    .min(1, 'O link original é obrigatório'),
  shortUrl: z.string().min(1, 'O link encurtado é obrigatório'),
})

type NewLinkFormData = z.infer<typeof newLinkSchema>

export const NewLinkForm = () => {
  const addLink = useLinkStore.use.addLink()
  const setIsLoading = useLinkStore.use.setIsLoading()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewLinkFormData>({
    resolver: zodResolver(newLinkSchema),
  })

  useEffect(() => {
    setIsLoading(isSubmitting)
  }, [isSubmitting, setIsLoading])

  // ✅ Função para receber os dados
  const onSubmit = async ({ originalUrl, shortUrl }: NewLinkFormData) => {
    try {
      const { link } = await createLink({
        originalUrl,
        shortUrl,
      })

      addLink(link)

      reset()

      toast.success('Link criado com sucesso!')
    } catch (error) {
      const isAxiosError = error instanceof AxiosError
      const description = isAxiosError
        ? error.response?.data.message
        : 'Não foi possível criar o link, tente novamente mais tarde.'

      toast.error(description)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg col-span-2 md:col-span-1"
    >
      <fieldset>
        <div className="flex flex-col gap-6">
          <legend className="text-lg text-gray-600">Novo link</legend>

          <div className="flex flex-col gap-4">
            <Input.Root data-error={Object.hasOwn(errors, 'originalUrl')}>
              <Input.Label htmlFor="originalUrl">Link original</Input.Label>
              <Input.Wrapper>
                <Input.Control
                  type="text"
                  id="originalUrl"
                  placeholder="https://www.example.com"
                  autoFocus
                  {...register('originalUrl')}
                />
              </Input.Wrapper>
              {errors.originalUrl?.message && (
                <Input.Error message={errors.originalUrl.message} />
              )}
            </Input.Root>

            <Input.Root data-error={Object.hasOwn(errors, 'shortUrl')}>
              <Input.Label htmlFor="shortUrl">Link encurtado</Input.Label>
              <Input.Wrapper>
                <Input.Affix className="text-md text-gray-400">
                  brev.ly/
                </Input.Affix>

                <Input.Control
                  type="text"
                  id="shortUrl"
                  {...register('shortUrl')}
                />
              </Input.Wrapper>
              {errors.shortUrl?.message && (
                <Input.Error message={errors.shortUrl.message} />
              )}
            </Input.Root>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
