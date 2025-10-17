import { create } from 'zustand'
import { persist } from "zustand/middleware";


interface Socks5ProxyStoreState {
  ip: string
  setIp: (ip: string) => void
  port: string
  setPort: (port: string) => void
  user: string
  setUser: (user: string) => void
  password: string
  setPassword: (password: string) => void
  shadowrocketRemark: string
  setShadowrocketRemark: (shadowrocketRemark: string) => void
}

export const useSocks5ProxyStore = create<Socks5ProxyStoreState>()(
  persist((set) => ({
    ip: '',
    setIp: (ip) => set({ ip }),
    port: '5555',
    setPort: (port) => set({ port }),
    user: 'bitcoin',
    setUser: (user) => set({ user }),
    password: 'sadfq3345sgz',
    setPassword: (password) => set({ password }),
    shadowrocketRemark: '',
    setShadowrocketRemark: (shadowrocketRemark) => set({ shadowrocketRemark }),
  }), {
    name: 'socks5-proxy-store', // 存储在 localStorage 的 key
  })
)