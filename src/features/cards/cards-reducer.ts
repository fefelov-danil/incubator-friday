import { AxiosError } from 'axios'

import { errorUtils } from '../../utils/errors-handler'

import { cardsAPI, GetCardsResponseType, UpdateCardType } from './cards-API'

import { setAppStatusAC } from 'app/app-reducer'
import { AppDispatch, RootState } from 'app/store'

const cardsInitialState = {
  cards: null as CardType[] | null,
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 5,
  packUserId: '',
  currentPackId: '',
  sortCardsValue: '0updated',
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
    case 'CARDS/SET-CURRENT-PACK-ID':
      return {
        ...state,
        currentPackId: action.id,
      }
    case 'CARDS/SET-PAGE':
      return { ...state, page: action.page }
    case 'CARDS/SET-PAGE-COUNT':
      return { ...state, pageCount: action.count }
    case 'CARDS/SET-SORT-CARDS-VALUE':
      return { ...state, sortCardsValue: action.sortCardsValue }
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

export const setCurrentPackIdAC = (id: string) => {
  return {
    type: 'CARDS/SET-CURRENT-PACK-ID',
    id,
  } as const
}

export const setCurrentCardsPageAC = (page: number) => {
  return {
    type: 'CARDS/SET-PAGE',
    page,
  } as const
}

export const setPageCardsCountAC = (count: number) => {
  return {
    type: 'CARDS/SET-PAGE-COUNT',
    count,
  } as const
}

export const setSortCardsValueAC = (sortCardsValue: string) => {
  return {
    type: 'CARDS/SET-SORT-CARDS-VALUE',
    sortCardsValue,
  } as const
}

// Thunks

export const getCardsTC = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setAppStatusAC('loading'))
  const cardsPack_id = getState().cards.currentPackId
  const page = getState().cards.page
  const pageCount = getState().cards.pageCount
  const sortCards = getState().cards.sortCardsValue

  try {
    const res = await cardsAPI.getCards({
      cardsPack_id,
      page,
      pageCount,
      sortCards,
    })

    dispatch(setCardsAC(res.data))
    dispatch(setAppStatusAC('succeeded'))
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

export const createNewCardTC = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const cardsPack_id = getState().cards.currentPackId

  try {
    await cardsAPI.addCard({
      cardsPack_id,
    })
    dispatch(getCardsTC())
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

export const deleteCardTC =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await cardsAPI.deleteCard(id)
      dispatch(getCardsTC())
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    }
  }

export const updateCardTC =
  (data: UpdateCardType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await cardsAPI.updateCard(data)
      dispatch(getCardsTC())
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    }
  }

// Types

type CardsStateType = typeof cardsInitialState
export type CardsActionsType =
  | ReturnType<typeof setCardsAC>
  | ReturnType<typeof setCurrentPackIdAC>
  | ReturnType<typeof setCurrentCardsPageAC>
  | ReturnType<typeof setPageCardsCountAC>
  | ReturnType<typeof setSortCardsValueAC>

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
