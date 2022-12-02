import { AxiosError } from 'axios'

import { setAppStatusAC } from 'app/app-reducer'
import { AppDispatch, RootState } from 'app/store'
import { cardsAPI, GetCardsResponseType } from 'features/cards/cards-API'
import { CardType } from 'features/cards/cards-reducer'
import { learnAPI } from 'features/learn/learn-API'
import { errorUtils } from 'utils/errors-handler'

const learnInitialState = {
  cardsPack_id: '',
  cards: null as CardType[] | null,
  cardsTotalCount: 0,
  pageCount: 150,
  packUserId: '',
  questionsCompleted: false,
  learnLoading: true,
}

export const learnReducer = (
  state: LearnInitialStateType = learnInitialState,
  action: LearnActionsType
): LearnInitialStateType => {
  switch (action.type) {
    case 'LEARN/SET-LEARN-CARDS':
      return {
        ...state,
        cards: action.data.cards,
        cardsTotalCount: action.data.cardsTotalCount,
        packUserId: action.data.packUserId,
      }
    case 'LEARN/DEL-STUDIED-CARD':
      return {
        ...state,
        cards: action.cards,
      }
    case 'LEARN/QUESTIONS-COMPLETED':
      return { ...state, questionsCompleted: action.completed }
    case 'LEARN/SET-CARDS-PACK-ID':
      return { ...state, cardsPack_id: action.cardsPack_id }
    default:
      return state
  }
}

// Actions
export const setLearnCardsAC = (data: GetCardsResponseType) => {
  return {
    type: 'LEARN/SET-LEARN-CARDS',
    data,
  } as const
}

export const deleteStudiedCardAC = (cards: CardType[]) => {
  return {
    type: 'LEARN/DEL-STUDIED-CARD',
    cards,
  } as const
}

export const questionsCompletedAC = (completed: boolean) => {
  return {
    type: 'LEARN/QUESTIONS-COMPLETED',
    completed,
  } as const
}

export const setCardsPackIdInLearnAC = (cardsPack_id: string) => {
  return {
    type: 'LEARN/SET-CARDS-PACK-ID',
    cardsPack_id,
  } as const
}

// Thunks
export const getCardsForLearnTC =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC('loading'))
    const pageCount = getState().learn.pageCount
    const cardsPack_id = getState().learn.cardsPack_id

    try {
      const res = await cardsAPI.getCards({
        cardsPack_id,
        pageCount,
      })

      dispatch(setLearnCardsAC(res.data))
      dispatch(setAppStatusAC('succeeded'))
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    }
  }

export const setGrade = (grade: number, card_id: string) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    const res = await learnAPI.updateGrade({
      grade,
      card_id,
    })

    dispatch(setAppStatusAC('succeeded'))

    return res.data
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

// Types
export type LearnInitialStateType = typeof learnInitialState
export type LearnActionsType =
  | ReturnType<typeof setLearnCardsAC>
  | ReturnType<typeof deleteStudiedCardAC>
  | ReturnType<typeof questionsCompletedAC>
  | ReturnType<typeof setCardsPackIdInLearnAC>
