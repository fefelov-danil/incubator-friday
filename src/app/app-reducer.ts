const appInitialState = {
  appError: null as null | string,
  appLoading: true,
  appStatus: 'idle' as AppStatusType,
  appAlert: { message: null, type: null } as AppAlertType,
}

export const appReducer = (state: AppStateType = appInitialState, action: AppActionsType) => {
  switch (action.type) {
    case 'APP/SET-APP-LOADING':
      return { ...state, appLoading: action.appLoading }
    case 'APP/SET-APP-STATUS':
      return { ...state, appStatus: action.appStatus }
    case 'APP/SET-ALERT':
      return { ...state, appAlert: action.appAlert }
    default:
      return state
  }
}

// actions
export const setAppAlertAC = (message: string | null, type: AlertType) => {
  return {
    type: 'APP/SET-ALERT',
    appAlert: { message, type } as AppAlertType,
  } as const
}

export const setAppLoadingAC = (appLoading: boolean) => {
  return {
    type: 'APP/SET-APP-LOADING',
    appLoading,
  } as const
}

export const setAppStatusAC = (appStatus: AppStatusType) => {
  return {
    type: 'APP/SET-APP-STATUS',
    appStatus,
  } as const
}

// types
type AppStateType = typeof appInitialState

export type AppActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppLoadingAC>
  | ReturnType<typeof setAppAlertAC>
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type AppAlertType = { message: null | string; type: AlertType }
export type AlertType = null | 'error' | 'success'
