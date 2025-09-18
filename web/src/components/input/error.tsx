/** biome-ignore-all lint/suspicious/noShadowRestrictedNames: not necessary */

import { WarningIcon } from '@phosphor-icons/react'

type ErrorProps = {
  message: string
}

export const Error = ({ message }: ErrorProps) => {
  return (
    <span className="text-sm text-gray-500 flex items-center gap-1">
      <WarningIcon className="size-4 text-danger" />
      {message}
    </span>
  )
}
