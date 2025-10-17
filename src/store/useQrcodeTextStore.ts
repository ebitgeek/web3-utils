import { create } from 'zustand'
import { persist } from "zustand/middleware";


interface QrcodeTextStoreState {
  qrcodeText: string
  setQrcodeText: (qrcodeText: string) => void
}

export const useQrcodeTextStore = create<QrcodeTextStoreState>()(
  persist(
    (set) => ({
      qrcodeText: '',
      setQrcodeText: (qrcodeText) => set({ qrcodeText }),
    }),
    {
      name: 'qrcode-text-store', // 存储在 localStorage 的 key
    }
  )
)