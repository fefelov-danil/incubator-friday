import { Dispatch } from 'redux'

import { RootState } from 'app/store'
import { authAPI, ProfileType, updateProfileModelType } from 'features/auth/auth-API'

const authInitialState = {
  authMe: false,
  profile: {} as ProfileType,
}

export const authReducer = (state: AuthStateType = authInitialState, action: authActionsType) => {
  switch (action.type) {
    case 'auth/AUTH-ME':
      return { ...state, authMe: true }
    case 'auth/PROFILE':
      return { ...state, profile: action.profile }
    case 'auth/LOGOUT':
      return { ...state, authMe: false }
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

// Types
type AuthStateType = typeof authInitialState
type authActionsType =
  | ReturnType<typeof authMeAC>
  | ReturnType<typeof profileAC>
  | ReturnType<typeof logOutAC>
