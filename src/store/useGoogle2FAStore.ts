import { create } from 'zustand'
import { persist } from "zustand/middleware";


interface Google2FAStoreState {
  secret: string
  setSecret: (secret: string) => void
}


export const useGoogle2FAStore = create<Google2FAStoreState>()(
  persist(
    (set) => ({
      secret: '',
      setSecret: (secret) => set({ secret }),
    }),
    {
      name: 'google-2fa-store', // 存储在 localStorage 的 key
      // 可选：自定义存储方式，比如 sessionStorage
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
)