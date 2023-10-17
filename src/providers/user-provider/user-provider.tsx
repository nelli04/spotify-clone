'use client'

import { FC, ReactNode } from 'react'

import { UserContextProvider } from '@/hooks'

type UserProviderProps = {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>
}
