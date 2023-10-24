import { create } from 'zustand'

type AuthModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

type useSubscribeModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

type UploadModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useAuthModal = create<AuthModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export const useSubscribeModal = create<useSubscribeModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export const useUploadModal = create<UploadModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
