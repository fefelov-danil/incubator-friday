import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

import { AuthActionsType, authReducer } from '../features/auth/auth-reducer'
import { PacksActionsType, packsReducer } from '../features/packs/packs-reducer'
import { loadState, saveState } from '../utils/localstorage-util'

import { AppActionsType, appReducer } from 'app/app-reducer'
import { CardsActionsType, cardsReducer } from 'features/cards/cards-reducer'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  packs: packsReducer,
  cards: cardsReducer,
})

export const store = createStore(rootReducer, loadState(), applyMiddleware(thunk))

store.subscribe(() => {
  saveState({
    packs: store.getState().packs,
    cards: store.getState().cards,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AllActionsType>
export type AllActionsType = AppActionsType | AuthActionsType | PacksActionsType | CardsActionsType

// @ts-ignore
window.store = store
// @ts-ignore
