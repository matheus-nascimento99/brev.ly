import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Control = ({ className, ...props }: ComponentProps<'input'>) => {
  return (
    <input
      className={twMerge(
        'outline-none text-md text-gray-600 w-full placeholder:text-gray-400 caret-gray-400 focus:caret-blue group-data-[error=true]:caret-danger',
        className
      )}
      {...props}
    />
  )
}
