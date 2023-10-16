'use client'

import { PlayerContent } from '@/components'
import { useGetSongById, useLoadSongUrl, usePlayer } from '@/hooks'

export const Player = () => {
  const player = usePlayer()
  const { song } = useGetSongById(player.activeId)

  const songUrl = useLoadSongUrl(song!)

  if (!song || !player.activeId || !songUrl) {
    return null
  }

  return (
    <div className="fixed bottom-0 bg-black w-full py-2 h-[95px] px-4">
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}
