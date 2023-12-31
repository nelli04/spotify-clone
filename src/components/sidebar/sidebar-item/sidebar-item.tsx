import { FC } from 'react'

import Link from 'next/link'
import { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

type SidebarItemProps = {
  icon: IconType
  label: string
  active?: boolean
  href: string
  collapse: boolean
}

export const SidebarItem: FC<SidebarItemProps> = ({
  label,
  active,
  href,
  icon: Icon,
  collapse,
}) => {
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 tex-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
        active && 'text-white'
      )}
    >
      {!collapse ? (
        <>
          <Icon size={26} />
          <p className="trancate w-full">{label}</p>
        </>
      ) : (
        <>
          <div className="px-4">
            <Icon size={26} />
          </div>
        </>
      )}
    </Link>
  )
}
