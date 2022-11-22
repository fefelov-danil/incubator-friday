import { AxiosError } from 'axios'

import { errorUtils } from '../../utils/errors-handler'

import { cardsAPI, GetCardsRequestType, GetCardsResponseType } from './cards-API'

import { AppDispatch } from 'app/store'

const cardsInitialState = {
  cards: null as CardType[] | null,
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 0,
  pageCount: 0,
  packUserId: '',
}

export const cardsReducer = (
  state: CardsStateType = cardsInitialState,
  action: CardsActionsType
): CardsStateType => {
  switch (action.type) {
    case 'CARDS/SET-CARDS':
      return {
        ...state,
        cards: action.data.cards,
        cardsTotalCount: action.data.cardsTotalCount,
        maxGrade: action.data.maxGrade,
        minGrade: action.data.minGrade,
        page: action.data.page,
        pageCount: action.data.pageCount,
        packUserId: action.data.packUserId,
      }
    default:
      return state
  }
}

// Actions

export const setCardsAC = (data: GetCardsResponseType) => {
  return {
    type: 'CARDS/SET-CARDS',
    data,
  } as const
}

// Thunks

export const getCardsTC = (data: GetCardsRequestType) => async (dispatch: AppDispatch) => {
  console.log('getCardsTC')
  try {
    const res = await cardsAPI.getCards(data)

    dispatch(setCardsAC(res.data))

    console.log(res.data)
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

export const setNewCardTC = (data: SetNewCardType) => async (dispatch: AppDispatch) => {
  console.log('getCardsTC')
  try {
    // await cardsAPI.(data)
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

// Types

type CardsStateType = typeof cardsInitialState
export type CardsActionsType = ReturnType<typeof setCardsAC>

export type CardType = {
  _id: string
  answer: string
  question: string
  cardsPack_id: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
}

export type SetNewCardType = {
  _id: string
  answer?: string
  question?: string
  cardsPack_id?: string
  grade?: number
  shots?: number
  user_id?: string
  created?: string
  updated?: string
}
