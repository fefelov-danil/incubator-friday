import { Dispatch } from 'redux'

import { authAPI, RegistrationRequestType } from './auth-API'

const authInitialState = {
  isRegistered: false,
}

export const authReducer = (state: AuthStateType = authInitialState, action: authActionsType) => {
  switch (action.type) {
    case 'AUTH/SET-REGISTRATION': {
      console.log('AUTH/SET-REGISTRATION')

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
  }
}
// Thunks

export const registerMeTC =
  (data: RegistrationRequestType) => (dispatch: Dispatch<authActionsType>) => {
    authAPI
      .registerMe(data)
      .then(res => {
        dispatch(setRegistrationAC(true))
      })
      .catch(error => {})
  }

// Types
type AuthStateType = typeof authInitialState
type authActionsType = ReturnType<typeof setRegistrationAC>
