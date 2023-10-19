'use client'

import { FC } from 'react'

import { AiOutlinePlus } from 'react-icons/ai'
import { BiLibrary } from 'react-icons/bi'

import { MediaItem } from '@/components'
import { useAuthModal, useOnPlay, useUploadModal, useUser } from '@/hooks'
import { Song } from '@/types'

type LibraryProps = {
  songs: Song[]
  onCollapse: () => void
  collapse: boolean
}

export const Library: FC<LibraryProps> = ({ songs, onCollapse, collapse }) => {
  const { user } = useUser()
  const onPlay = useOnPlay(songs)
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()

  const handleUploadModalOpen = () => {
    if (!user) {
      return authModal.onOpen()
    }

    return uploadModal.onOpen()
  }

  const handlePlay = (id: string) => {
    onPlay(id)
  }

  const libraryIconStyles = {
    text: `text-neutral-400 cursor-pointer ${collapse ? 'text-white' : 'text-neutral-400'}`,
    size: collapse ? 25 : 20,
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className={`inline-flex items-center gap-x-2  ${collapse && 'px-4'}`}>
          <BiLibrary
            onClick={onCollapse}
            className={libraryIconStyles.text}
            size={libraryIconStyles.size}
          />
          {!collapse && <p className="text-neutral-400 font-medium text-md">Your Library</p>}
        </div>
        {!collapse && (
          <AiOutlinePlus
            onClick={handleUploadModalOpen}
            size={20}
            className={libraryIconStyles.text}
          />
        )}
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map(song => (
          <MediaItem key={song.id} data={song} collapse={collapse} onClick={handlePlay} />
        ))}
      </div>
    </div>
  )
}
