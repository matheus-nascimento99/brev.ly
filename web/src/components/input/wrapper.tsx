import type { ComponentProps } from 'react'

export const Wrapper = (props: ComponentProps<'div'>) => {
  return (
    <div
      className="rounded-lg border border-gray-300 px-4 py-3 flex max-w-full group-has-focus:border-blue-base group-data-[error=true]:border-danger"
      {...props}
    />
  )
}
