import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0',
  withCredentials: true,
})

export const authAPI = {
  me() {
    return instance.post<ProfileType>('/auth/me', {})
  },
}

// types
type ProfileType = {
  created: string
  email: string
  name: string
  publicCardPacksCount: number
}
