/** biome-ignore-all lint/correctness/useUniqueElementIds: not necessary */

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewLinkFormData>({
    resolver: zodResolver(newLinkSchema),
  })

  // ✅ Função para receber os dados
  const onSubmit = async (data: NewLinkFormData) => {
    console.log('Dados do formulário:', data)

    await new Promise(resolve => setTimeout(resolve, 1000))

    // aqui você pode chamar sua API, mutation, etc.
    // depois que salvar, limpamos o form:
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg">
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
