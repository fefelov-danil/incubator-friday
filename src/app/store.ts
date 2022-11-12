import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { appReducer } from 'app/app-reducer'

const rootReducer = combineReducers({
  app: appReducer,
})

export type RootReducerType = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AllActionsType>

export type AllActionsType = { type: string }

// @ts-ignore
window.store = store
