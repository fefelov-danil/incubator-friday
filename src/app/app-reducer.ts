const appInitialState: AppStateType = {
  appError: null,
  appStatus: 'idle',
}

export const appReducer = (state: AppStateType = appInitialState, action: AppActionsType) => {
  switch (action.type) {
    case 'APP/SET-APP-ERROR':
      return { ...state, appError: action.error }
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

export const setAppStatusAC = (appStatus: AppStatusType) => {
  return {
    type: 'APP/SET-APP-STATUS',
    appStatus,
  } as const
}

// types
type AppStateType = {
  appError: string | null
  appStatus: AppStatusType
}
export type AppActionsType = ReturnType<typeof setAppErrorAC | typeof setAppStatusAC>
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
