import { Dispatch } from 'redux'

import { setAppErrorAC, setAppStatusAC } from '../../app/app-reducer'
import { errorUtils } from '../../utils/errorsHandler'

import { authAPI, RegistrationRequestType } from './auth-API'

const authInitialState = {
  isRegistered: false,
}

export const authReducer = (state: AuthStateType = authInitialState, action: authActionsType) => {
  switch (action.type) {
    case 'AUTH/SET-REGISTRATION': {
      return { ...state, isRegistered: action.isRegistered }
    }
    default:
      return state
  }
}

// Actions

const setRegistrationAC = (isRegistered: boolean) => {
  return {
    type: 'AUTH/SET-REGISTRATION',
    isRegistered,
  } as const
}

// Thunks

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
type authActionsType = ReturnType<
  typeof setRegistrationAC | typeof setAppErrorAC | typeof setAppStatusAC
>
