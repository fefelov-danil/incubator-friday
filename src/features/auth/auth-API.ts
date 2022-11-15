import axios, { AxiosResponse } from 'axios'

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
  login(data: LoginParamsDataType) {
    return instance.post<LoginParamsDataType, AxiosResponse<LoginResponseType>>('auth/login', data)
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

export type LoginParamsDataType = {
  email: string
  password: string
  rememberMe: boolean
}

export type LoginResponseType = {
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: Date
  updated: Date
  __v: number
  token: string
  tokenDeathTime: number
  avatar?: string
}
