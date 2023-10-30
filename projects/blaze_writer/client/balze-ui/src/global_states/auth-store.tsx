import { User } from '@the-long-chain/api-operations'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface IStateDBUser {
  user: User
  setUser: (user: User) => void
  token: string
  setToken: (token: string) => void
  clear: () => void
}

const defaultUser: User = {
  _id: '',
  email: '',
  name: '',
  quota: {
    workspace: 0,
  },
  lastLogin: '',
}

export const useAuthStore = create(
  persist<IStateDBUser>(
    (set, get) => ({
      user: defaultUser,
      setUser: (user: User) => set({ user }),
      token: '',
      setToken: (token: string) => set({ token }),
      clear: () => set({ user: defaultUser, token: '' }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
