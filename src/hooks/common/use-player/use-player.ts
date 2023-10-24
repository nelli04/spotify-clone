import arrayShuffle from 'array-shuffle'
import { create } from 'zustand'

type PlayerStore = {
  ids: string[]
  unShuffledIds: string[]
  activeId?: string
  setId: (id: string) => void
  setIds: (ids: string[]) => void
  setUnShuffledIds: (unShuffledIds: string[]) => void
  reset: () => void
  shuffle: (ids: string[]) => void
  resetShuffle: (ids: string[]) => void
}

export const usePlayer = create<PlayerStore>(set => ({
  ids: [],
  activeId: undefined,
  unShuffledIds: [],
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  setUnShuffledIds: (unShuffledIds: string[]) => set({ unShuffledIds }),
  reset: () => set({ ids: [], unShuffledIds: [], activeId: undefined }),
  shuffle: (ids: string[]) =>
    set({
      ids: arrayShuffle(ids),
    }),
  resetShuffle: (ids: string[]) =>
    set({
      ids,
    }),
}))
