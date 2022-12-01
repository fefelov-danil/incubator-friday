import axios, { AxiosResponse } from 'axios'

export const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})

export const authAPI = {
  me() {
    return instance.post<ProfileType>('/auth/me', {})
  },
  logOut() {
    return instance.delete('/auth/me')
  },
  updateProfile(data: updateProfileModelType) {
    return instance.put<UpdateProfileType>('/auth/me', data)
  },
  registerMe(data: RegistrationRequestType) {
    return instance.post<RegistrationRequestType>('auth/register', data)
  },
  login(data: LoginParamsDataType) {
    return instance.post<LoginParamsDataType, AxiosResponse<ProfileType>>('auth/login', data)
  },
  setNewPassword(data: SetNewPasswordDataType) {
    return instance.post<LoginParamsDataType, AxiosResponse<SetNewPasswordResponseType>>(
      'auth/set-new-password',
      data
    )
  },
  forgot(data: ResetPasswordRequestType) {
    return instance.post<ResetPasswordRequestType, AxiosResponse>('/auth/forgot', data)
  },
}

// types
export type ProfileType = {
  _id: string
  created: string
  email: string
  name: string
  publicCardPacksCount: number
  avatar: string
}

export type updateProfileModelType = Partial<{
  name: string
  avatar: string
}>

type UpdateProfileType = {
  updatedUser: ProfileType
}

export type LoginParamsDataType = {
  email: string
  password: string
  rememberMe: boolean
}

export type SetNewPasswordDataType = {
  password: string
  resetPasswordToken: string
}

export type SetNewPasswordResponseType = {
  info: string
  error: string
}

export type RegistrationRequestType = {
  email: string
  password: string
}

export type ResetPasswordRequestType = {
  email: string
  from: string
  message: string
}
