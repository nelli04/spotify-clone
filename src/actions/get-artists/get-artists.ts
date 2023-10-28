import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Artists } from '@/types'

const supabase = createServerComponentClient({ cookies: cookies })

export const getArtists = async (): Promise<Artists[]> => {
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error as any)
  }

  return (data as any) || []
}
