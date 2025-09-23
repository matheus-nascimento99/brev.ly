/// <reference types="vite/client" />

import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Toaster } from 'sonner'
import * as appCss from '../index.css'

const RootLayout = () => {
  return (
    <div className="px-3 py-8 md:max-w-[980px] md:m-auto md:pt-[88px]">
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
      <Toaster richColors />
    </div>
  )
}

export const Route = createRootRoute({
  // @ts-expect-error
  head: () => ({
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: true,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap',
      },
      { rel: 'stylesheet', href: appCss },
    ],
  }),
  component: RootLayout,
})
