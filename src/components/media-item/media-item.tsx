'use client'

import { FC } from 'react'

import Image from 'next/image'

import { useLoadImage } from '@/hooks'
import { Song } from '@/types'

type MediaItemProps = {
  onClick?: (id: string) => void
  data: Song
}

export const MediaItem: FC<MediaItemProps> = ({ onClick, data }) => {
  const imageUrl = useLoadImage(data)
  const handleClick = () => {
    if (onClick) {
      return onClick(data.id)
    }
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
      <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
        <Image className="object-cover" src={imageUrl || '/img/liked.png'} alt="Media Item" fill />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white truncate">{data.title}</p>
        <p className="text-neutral-400 text-sm truncate">{data.author}</p>
      </div>
    </div>
  )
}
