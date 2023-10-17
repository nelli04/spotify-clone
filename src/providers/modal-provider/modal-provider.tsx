'use client'

import { FC, useEffect, useState } from 'react'

import { AuthModal } from '@/components/modals/auth-modal'
import { SubscribeModal } from '@/components/modals/subscribe-modal'
import { UploadModal } from '@/components/modals/upload-modal'
import { ProductWithPrice } from '@/types'

type ModalProviderProps = {
  products: ProductWithPrice[]
}

export const ModalProvider: FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  )
}
