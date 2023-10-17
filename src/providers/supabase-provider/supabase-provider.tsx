'use client'

import { FC, ReactNode, useState } from 'react'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import { Database } from '@/types'

type SupabaseProviderProps = {
  children: ReactNode
}

export const SupabaseProvider: FC<SupabaseProviderProps> = ({ children }) => {
  const [supabaseClient] = useState(() => createClientComponentClient<Database>())

  return <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>
}
