import axios from 'axios'
import { Dispatch } from 'redux'
import { errorUtils } from '../../utils/errorsHandler'
import { RootState } from 'app/store'
import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { authAPI, LoginParamsDataType, RegistrationRequestType, LoginResponseType, ProfileType, updateProfileModelType } from 'features/auth/auth-API'

const authInitialState = {
  authMe: false,
  isRegistered: false,
  profile: {} as ProfileType,
  isLoggedIn: false,
  _id: '',
  email: '',
  rememberMe: false,
  isAdmin: false,
  name: '',
  verified: false,
  publicCardPacksCount: 0,
  created: null,
  updated: null,
  __v: 0,
  token: '',
  tokenDeathTime: 0,
}

export const authReducer = (state: AuthStateType = authInitialState, action: authActionsType) => {
  switch (action.type) {
    case 'auth/AUTH-ME':
      return { ...state, authMe: true }
    case 'auth/PROFILE':
      return { ...state, profile: action.profile }
    case 'auth/LOGOUT':
      return { ...state, authMe: false }
    case 'LOGIN/SET-IS-LOGGED-IN':
      return {
        ...state,
        isLoggedIn: action.value,
      }
    case 'LOGIN/SET-USER-DATA':
      return { ...state, ...action.userData }
    case 'AUTH/SET-REGISTRATION': {
      return { ...state, isRegistered: action.isRegistered }
    }
    default:
      return state
  }
}

// Actions
export const authMeAC = () => {
  return { type: 'auth/AUTH-ME' } as const
}
export const profileAC = (profile: ProfileType) => {
  return { type: 'auth/PROFILE', profile } as const
}
export const logOutAC = () => {
  return { type: 'auth/LOGOUT' } as const
}
const setIsLoggedInAC = (value: boolean) => ({ type: 'LOGIN/SET-IS-LOGGED-IN', value } as const)
const setUserDataAC = (userData: LoginResponseType) =>
  ({ type: 'LOGIN/SET-USER-DATA', userData } as const)

const setRegistrationAC = (isRegistered: boolean) => {
  return {
    type: 'AUTH/SET-REGISTRATION',
    isRegistered,
  } as const
}

// Thunks
export const authMeTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.me()

    dispatch(authMeAC())
    const avatar = res.data.avatar
      ? res.data.avatar
      : 'https://avatarfiles.alphacoders.com/798/79894.jpg'

    dispatch(profileAC({ ...res.data, avatar }))
  } catch (err) {
    console.log(err)
  }
}
export const logOutTC = () => async (dispatch: Dispatch) => {
  try {
    await authAPI.logOut()

    dispatch(logOutAC())
  } catch (err) {
    console.log(err)
  }
}
export const updateProfile =
  (profileModel: updateProfileModelType) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const profile = getState().auth.profile

    const profileApiModel = {
      name: profile.name,
      avatar: profile.avatar,
      ...profileModel,
    }

    try {
      const res = await authAPI.updateProfile(profileApiModel)

      dispatch(profileAC(res.data.updatedUser))
    } catch (err) {
      console.log(err)
    }
  }
export const loginTC = (data: LoginParamsDataType) => async (dispatch: Dispatch) => {
  try {
    const response = await authAPI.login(data)

    dispatch(setUserDataAC(response.data))
    dispatch(setIsLoggedInAC(true))
    alert('Success')
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response ? e.response.data.error : e.message)
      alert(e.response ? e.response.data.error : e.message)
    } else console.log('Some error occurred')
  }
}

export const registerMeTC =
  (data: RegistrationRequestType) => (dispatch: Dispatch<authActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI
      .registerMe(data)
      .then(res => {
        dispatch(setRegistrationAC(true))
        dispatch(setAppStatusAC('succeeded'))
      })
      .catch(error => {
        errorUtils(error, dispatch)
        dispatch(setAppStatusAC('succeeded'))
      })
  }

// Types
type AuthStateType = typeof authInitialState
type AuthStateType1 = {
  isLoggedIn: boolean
  _id: string
  email: string
  rememberMe: boolean
  isAdmin: boolean
  name: string
  verified: boolean
  publicCardPacksCount: number
  created: Date | null
  updated: Date | null
  __v: number
  token: string
  tokenDeathTime: number
}
type authActionsType =
  | ReturnType<typeof authMeAC>
  | ReturnType<typeof profileAC>
  | ReturnType<typeof logOutAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setUserDataAC>
  | ReturnType<typeof setRegistrationAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppStatusAC>
