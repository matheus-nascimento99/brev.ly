import type { ComponentProps } from 'react'

export const Root = (props: ComponentProps<'div'>) => {
  return <div className="group flex flex-col gap-2" {...props} />
}
