import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Song } from '@/types'

const supabase = createServerComponentClient({ cookies: cookies })

export const getSongsByUserId = async (): Promise<Song[]> => {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

  if (sessionError) {
    console.error(sessionError.message)

    return []
  }
  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error.message)
  }

  return data || []
}
