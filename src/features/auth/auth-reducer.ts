import { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { setAppAlertAC, setAppLoading, setAppStatusAC } from '../../app/app-reducer'
import { errorUtils } from '../../utils/errorsHandler'

import { RootState } from 'app/store'
import {
  authAPI,
  LoginParamsDataType,
  ProfileType,
  RegistrationRequestType,
  ResetPasswordRequestType,
  setNewPasswordDataType,
  updateProfileModelType,
} from 'features/auth/auth-API'

const authInitialState = {
  authMe: false,
  isRegistered: false,
  profile: {} as ProfileType,
  isLoggedIn: false,
  isPasswordReset: false,
}

export const authReducer = (state: AuthStateType = authInitialState, action: authActionsType) => {
  switch (action.type) {
    case 'auth/PROFILE':
      return { ...state, profile: action.profile }
    case 'auth/SET-IS-LOGGED-IN':
      return {
        ...state,
        isLoggedIn: action.value,
      }
    case 'auth/SET-REGISTRATION': {
      return { ...state, isRegistered: action.isRegistered }
    }
    case 'AUTH/SET-PASSWORD-RESET': {
      return { ...state, isPasswordReset: action.isPasswordReset }
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

export const setRegistrationAC = (isRegistered: boolean) => {
  return {
    type: 'auth/SET-REGISTRATION',
    isRegistered,
  } as const
}
export const setPasswordResetAC = (isPasswordReset: boolean) => {
  return {
    type: 'AUTH/SET-PASSWORD-RESET',
    isPasswordReset,
  } as const
}

// Thunks
export const authMeTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppLoading(true))
  try {
    const res = await authAPI.me()

    dispatch(setIsLoggedInAC(true))
    dispatch(setRegistrationAC(true))
    const avatar = 'https://avatarfiles.alphacoders.com/798/79894.jpg'

    dispatch(profileAC({ ...res.data, avatar }))
    dispatch(setAppLoading(false))
  } catch (err) {
    dispatch(setAppLoading(false))
  }
}
export const logOutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    await authAPI.logOut()

    dispatch(setIsLoggedInAC(false))
    dispatch(setAppStatusAC('succeeded'))
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}
export const updateProfileTC =
  (profileModel: updateProfileModelType) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC('loading'))

    const profile = getState().auth.profile

    const profileApiModel = {
      name: profile.name,
      avatar: profile.avatar,
      ...profileModel,
    }

    try {
      const res = await authAPI.updateProfile(profileApiModel)

      dispatch(profileAC(res.data.updatedUser))
      dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    }
  }
export const loginTC = (data: LoginParamsDataType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const response = await authAPI.login(data)

    const avatar = 'https://avatarfiles.alphacoders.com/798/79894.jpg'

    dispatch(profileAC({ ...response.data, avatar }))
    dispatch(setIsLoggedInAC(true))
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  } finally {
    dispatch(setAppStatusAC('succeeded'))
  }
}

export const setNewPasswordTC =
  (data: setNewPasswordDataType, callBack: () => void) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
      await authAPI.setNewPassword(data)

      callBack()
      dispatch(setAppAlertAC('Password successfully changed', 'success'))
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    } finally {
      dispatch(setAppStatusAC('succeeded'))
    }
  }
export const registerMeTC =
  (data: RegistrationRequestType) => async (dispatch: Dispatch<authActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
      await authAPI.registerMe(data)

      dispatch(setRegistrationAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    }
  }

export const resetPasswordTC =
  (data: ResetPasswordRequestType) => async (dispatch: Dispatch<authActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
      await authAPI.forgot(data)

      dispatch(setPasswordResetAC(true))
      dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    }
  }

// Types
type AuthStateType = typeof authInitialState
type authActionsType =
  | ReturnType<typeof profileAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setRegistrationAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setPasswordResetAC>