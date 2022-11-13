import axios from 'axios'
import { Dispatch } from 'redux'

import { authAPI, LoginParamsDataType, LoginResponseType } from './auth-API'

const authInitialState = {
  isLoggedIn: false,
  _id: '',
  email: '',
  rememberMe: false,
  isAdmin: false,
  name: '',
  verified: false,
  publicCardPacksCount: 0,
  created: '',
  updated: '',
  __v: 0,
  token: '',
  tokenDeathTime: 0,
}

export const authReducer = (state: AuthStateType = authInitialState, action: authActionsType) => {
  switch (action.type) {
    case 'LOGIN/SET-IS-LOGGED-IN':
      return {
        ...state,
        isLoggedIn: action.value,
      }
    case 'LOGIN/SET-USER-DATA':
      return { ...state, ...action.userData }
    default:
      return state
  }
}

// Actions
const setIsLoggedInAC = (value: boolean) => ({ type: 'LOGIN/SET-IS-LOGGED-IN', value } as const)
const setUserDataAC = (userData: LoginResponseType) =>
  ({ type: 'LOGIN/SET-USER-DATA', userData } as const)

// Thunks
export const loginTC = (data: LoginParamsDataType) => async (dispatch: Dispatch) => {
  try {
    const response = await authAPI.login(data)

    dispatch(setUserDataAC(response.data))
    dispatch(setIsLoggedInAC(true))
  } catch (e) {
    if (axios.isAxiosError(e)) {
      console.log(e.response ? e.response.data.error : e.message)
    } else console.log('Some error occurred')
  }
}

// Types
type AuthStateType = typeof authInitialState
type authActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setUserDataAC>
