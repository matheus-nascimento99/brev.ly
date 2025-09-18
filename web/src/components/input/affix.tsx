import type { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const Affix = ({ className, ...props }: ComponentProps<'span'>) => {
  return <span className={twMerge('shrink-0', className)} {...props} />
}
