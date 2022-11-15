import axios from 'axios'

export const instance = axios.create({
  baseURL: 'http://localhost:7542/2.0',
  withCredentials: true,
})

export const authAPI = {
  me() {
    return instance.post<ProfileType>('/auth/me', {})
  },
  logOut() {
    return instance.delete('/auth/me')
  },
  updateProfile(profileModel: updateProfileModelType) {
    return instance.put<updateProfile>('/auth/me', profileModel)
  },
}

// types
export type ProfileType = {
  created: string
  email: string
  name: string
  publicCardPacksCount: number
  avatar: string
}
export type updateProfileModelType = {
  name?: string
  avatar?: string
}
type updateProfile = {
  updatedUser: ProfileType
}
