import { useAuthModal, usePlayer, useUser } from '@/hooks'
import { Song } from '@/types'

export const useOnPlay = (songs: Song[]) => {
  const { setId, setIds, setUnShuffledIds } = usePlayer()
  const authModal = useAuthModal()
  const { user, subscription } = useUser()

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen()
    }

    setId(id)
    const ids = songs.map(song => song.id)

    setIds(ids)
    setUnShuffledIds(ids)
  }

  return onPlay
}
