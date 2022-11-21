import { AxiosError } from 'axios'

import { errorUtils } from '../../utils/errors-handler'

import { AppDispatch } from 'app/store'

const cardsInitialState = {
  page: 1,
  pageCount: 10,
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
}

export const cardsReducer = (
  state: CardsStateType = cardsInitialState,
  action: CardsActionsType
): CardsStateType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS':
      return { ...state, ...action.data }
    default:
      return state
  }
}

// Actions
export const setPacksAC = (data: any) => {
  return {
    type: 'CARDS/SET-CARDS',
    data,
  } as const
}

// Thunks

export const getPacksTC = (data: any) => async (dispatch: AppDispatch) => {
  try {
    console.log('')
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

// Types
type CardsStateType = typeof cardsInitialState
export type CardsActionsType = ReturnType<typeof setPacksAC>

export type CardType = {
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
  _id: string
}
