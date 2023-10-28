import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { getSongs } from '../get-songs/get-songs'

import { Song } from '@/types'

const supabase = createServerComponentClient({ cookies: cookies })

export const getSongsByTitle = async (title: string): Promise<Song[]> => {
  if (!title) {
    return await getSongs()
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
  }

  return data || []
}
