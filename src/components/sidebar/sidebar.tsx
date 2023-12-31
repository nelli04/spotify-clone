'use client'

import { FC, ReactNode, useMemo, useState } from 'react'

import { usePathname } from 'next/navigation'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import { twMerge } from 'tailwind-merge'

import { Box, Library, SidebarItem } from '@/components'
import { usePlayer } from '@/hooks'
import { Song } from '@/types'

type SidebarProps = {
  children: ReactNode
  songs: Song[]
}

export const Sidebar: FC<SidebarProps> = ({ children, songs }) => {
  const player = usePlayer()
  const pathname = usePathname()
  const [collapse, setCollapse] = useState(false)

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
      },
      {
        icon: BiSearch,
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname]
  )

  const onCollapse = () => {
    setCollapse(!collapse)
  }

  const sidebarStyles = {
    main: `hidden md:flex flex-col gap-y-2 bg-black h-full ${
      collapse ? 'w-[110px]' : 'w-[300px]'
    }  p-2`,
  }

  return (
    <div className={twMerge(`flex h-full`, player.activeId && 'h-[calc(100%-80px)]')}>
      <div className={sidebarStyles.main}>
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map(item => (
              <SidebarItem collapse={collapse} key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library collapse={collapse} songs={songs} onCollapse={onCollapse} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">{children}</main>
    </div>
  )
}
