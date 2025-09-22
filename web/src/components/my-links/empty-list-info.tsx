import { LinkIcon } from '@phosphor-icons/react'

export const EmptyListInfo = () => {
  return (
    <div className="flex-1 pt-4 pb-6 gap-3 flex flex-col items-center">
      <LinkIcon className="size-8 text-gray-400" />
      <span className="text-xs text-gray-500 uppercase">
        ainda não existem links cadastrados
      </span>
    </div>
  )
}
