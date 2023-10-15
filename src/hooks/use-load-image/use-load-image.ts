import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { Song } from '@/types'

export const useLoadImage = (song: Song) => {
  const supabadeClient = useSupabaseClient()

  if (!song) {
    return null
  }
  const { data: imageData } = supabadeClient.storage.from('images').getPublicUrl(song.image_path)

  return imageData.publicUrl
}
