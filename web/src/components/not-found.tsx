import { Link } from '@tanstack/react-router'

export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-gray-100 py-16 px-12 my-auto mx-auto md:max-w-[580px] rounded-xl">
      <img src="/404.svg" alt="logo" className="h-16 md:h-20" />

      <span className="text-xl text-gray-600 text-center">
        Link não encontrado
      </span>

      <p className="text-md text-gray-500 text-center">
        O link que você está tentando acessar não existe, foi removido ou é uma
        URL inválida. Saiba mais em{' '}
        <Link
          to="/"
          className="text-md-semibold text-blue-base hover:underline"
        >
          brev.ly
        </Link>
        .
      </p>
    </div>
  )
}
