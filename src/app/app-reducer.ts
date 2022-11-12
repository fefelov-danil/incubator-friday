const appInitialState = {}

export const appReducer = (state: AppStateType = appInitialState, action: AppActionsType) => {
  switch (action.type) {
    default:
      return state
  }
}

// actions

// types
type AppStateType = typeof appInitialState
type AppActionsType = any
