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

export async function getArtistById(id: string): Promise<Artists> {
  const { data, error } = await supabase.from('artists').select('*').eq('id', id).single()

  if (error) {
    console.error(error)
  }

  return {
    id: data.id,
    author: data.author,
    image_path: data.image_path,
  }
}
