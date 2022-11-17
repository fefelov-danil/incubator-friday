import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { errorUtils } from '../../utils/errorsHandler'

import { RootState } from 'app/store'
import {
  authAPI,
  RegistrationRequestType,
  ProfileType,
  updateProfileModelType,
  LoginParamsDataType,
  setNewPasswordDataType,
} from 'features/auth/auth-API'

const authInitialState = {
  authMe: false,
  isRegistered: false,
  profile: {} as ProfileType,
  isLoggedIn: false,
}

export const authReducer = (
  state: AuthStateType = authInitialState,
  action: authActionsType
): AuthStateType => {
  switch (action.type) {
    case 'auth/PROFILE':
      return { ...state, profile: action.profile }
    case 'auth/SET-IS-LOGGED-IN':
      return {
        ...state,
        isLoggedIn: action.value,
      }
    case 'auth/SET-USER-DATA':
      return { ...state, ...action.userData }
    case 'AUTH/SET-REGISTRATION': {
      return { ...state, isRegistered: action.isRegistered }
    }
    default:
      return state
  }
}

// Actions
export const profileAC = (profile: ProfileType) => {
  return { type: 'auth/PROFILE', profile } as const
}
const setIsLoggedInAC = (value: boolean) => ({ type: 'auth/SET-IS-LOGGED-IN', value } as const)
const setUserDataAC = (userData: ProfileType) => ({ type: 'auth/SET-USER-DATA', userData } as const)

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

    dispatch(setIsLoggedInAC(true))
    const avatar = res.data.avatar
      ? res.data.avatar
      : 'https://avatarfiles.alphacoders.com/798/79894.jpg'

    dispatch(profileAC({ ...res.data, avatar }))
  } catch (err) {
    console.log(err)
  }
}
export const logOutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    await authAPI.logOut()

    dispatch(setIsLoggedInAC(false))
  } catch (err) {
    console.log(err)
  } finally {
    dispatch(setAppStatusAC('idle'))
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
  dispatch(setAppStatusAC('loading'))
  try {
    const response = await authAPI.login(data)

    dispatch(setUserDataAC(response.data))
    dispatch(setIsLoggedInAC(true))
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  } finally {
    dispatch(setAppStatusAC('succeeded'))
  }
}

export const setNewPasswordTC = (data: setNewPasswordDataType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const response = await authAPI.setNewPassword(data)

    alert('Password has been changed')
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  } finally {
    dispatch(setAppStatusAC('succeeded'))
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
type AuthStateType1 = typeof authInitialState
type AuthStateType = {
  authMe: boolean
  isRegistered: boolean
  profile: ProfileType
  isLoggedIn: boolean
}
type authActionsType =
  | ReturnType<typeof profileAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setUserDataAC>
  | ReturnType<typeof setRegistrationAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppStatusAC>
