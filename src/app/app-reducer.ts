const appInitialState = {
  appError: null as null | string,
  appLoading: true,
  appStatus: 'idle' as AppStatusType,
}

export const appReducer = (state: AppStateType = appInitialState, action: AppActionsType) => {
  switch (action.type) {
    case 'APP/SET-APP-ERROR':
      return { ...state, appError: action.error }
    case 'APP/SET-APP-LOADING':
      return { ...state, appLoading: action.appLoading }
    case 'APP/SET-APP-STATUS':
      return { ...state, appStatus: action.appStatus }
    default:
      return state
  }
}

// actions

export const setAppErrorAC = (error: string | null) => {
  return {
    type: 'APP/SET-APP-ERROR',
    error,
  } as const
}

export const setAppLoading = (appLoading: boolean) => {
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
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppLoading>
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
