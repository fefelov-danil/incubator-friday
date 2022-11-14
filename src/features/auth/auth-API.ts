import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0',
  withCredentials: true,
})

export const authAPI = {
  me() {
    return instance.post<AuthMeType>('/auth/me', {})
  },
}

// types
type AuthMeType = {
  created: string
  email: string
  name: string
  publicCardPacksCount: number
}
