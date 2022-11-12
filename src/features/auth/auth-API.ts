import axios from 'axios'

export const instance = axios.create({
  //baseURL: 'https://neko-back.herokuapp.com/2.0',
  baseURL: 'http://localhost:7542/2.0/',
  withCredentials: true,
})

export const authAPI = {
  registerMe(data: RegistrationRequestType) {
    return instance.post<RegistrationRequestType>('auth/register', data)
  },
}

export type RegistrationRequestType = {
  email: string
  password: string
}
