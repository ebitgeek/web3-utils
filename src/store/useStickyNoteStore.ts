import { create } from 'zustand'
import { persist } from "zustand/middleware";


interface StickyNoteStoreState {
  stickyNoteText: string
  setStickyNoteText: (stickyNoteText: string) => void
}

export const useStickyNoteStore = create<StickyNoteStoreState>()(
  persist(
    (set) => ({
      stickyNoteText: '',
      setStickyNoteText: (stickyNoteText) => set({ stickyNoteText }),
    }),
    {
      name: 'sticky-note-store', // 存储在 localStorage 的 key
    }
  )
)