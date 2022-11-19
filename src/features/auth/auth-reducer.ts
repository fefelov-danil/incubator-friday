import { AxiosError } from 'axios'

import { setAppAlertAC, setAppLoadingAC, setAppStatusAC } from '../../app/app-reducer'
import { errorUtils } from '../../utils/errorsHandler'

import { AppDispatch, RootState } from 'app/store'
import {
  authAPI,
  LoginParamsDataType,
  ProfileType,
  RegistrationRequestType,
  ResetPasswordRequestType,
  SetNewPasswordDataType,
  updateProfileModelType,
} from 'features/auth/auth-API'

const authInitialState = {
  authMe: false,
  isRegistered: false,
  profile: {} as ProfileType,
  isLoggedIn: false,
  isPasswordReset: false,
}

export const authReducer = (
  state: AuthStateType = authInitialState,
  action: AuthActionsType
): AuthStateType => {
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
  return {
    type: 'auth/PROFILE',
    profile,
  } as const
}

const setIsLoggedInAC = (value: boolean) => {
  return {
    type: 'auth/SET-IS-LOGGED-IN',
    value,
  } as const
}

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
export const authMeTC = () => async (dispatch: AppDispatch) => {
  dispatch(setAppLoadingAC(true))
  try {
    const res = await authAPI.me()

    dispatch(setIsLoggedInAC(true))
    dispatch(setRegistrationAC(true))
    const avatar = 'https://avatarfiles.alphacoders.com/798/79894.jpg'

    dispatch(profileAC({ ...res.data, avatar }))
    dispatch(setAppLoadingAC(false))
  } catch (err) {
    dispatch(setAppLoadingAC(false))
  }
}

export const logOutTC = () => async (dispatch: AppDispatch) => {
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
  async (dispatch: AppDispatch, getState: () => RootState) => {
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

export const loginTC = (data: LoginParamsDataType) => async (dispatch: AppDispatch) => {
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
  (data: SetNewPasswordDataType, callBack: () => void) => async (dispatch: AppDispatch) => {
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

export const registerMeTC = (data: RegistrationRequestType) => async (dispatch: AppDispatch) => {
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
  (data: ResetPasswordRequestType) => async (dispatch: AppDispatch) => {
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
export type AuthActionsType =
  | ReturnType<typeof profileAC>
  | ReturnType<typeof setIsLoggedInAC>
  | ReturnType<typeof setRegistrationAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setPasswordResetAC>
