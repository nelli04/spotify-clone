import { create } from 'zustand'

type useSubscribeModalStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSubscribeModal = create<useSubscribeModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
