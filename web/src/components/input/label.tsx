/** biome-ignore-all lint/a11y/noLabelWithoutControl: not necessary */
import type { ComponentProps } from 'react'

export const Label = (props: ComponentProps<'label'>) => {
  return (
    <label
      className="text-xs uppercase text-gray-500 group-has-focus:text-blue-base group-data-[error=true]:text-danger"
      {...props}
    />
  )
}
