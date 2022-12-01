import { AxiosError } from 'axios'

import { AppDispatch, RootState } from 'app/store'
import { cardsAPI, GetCardsResponseType } from 'features/cards/cards-API'
import { CardType } from 'features/cards/cards-reducer'
import { errorUtils } from 'utils/errors-handler'

const learnInitialState = {
  cards: null as CardType[] | null,
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 0,
  page: 1,
  pageCount: 5,
  packUserId: '',
  sortCardsValue: '0updated',
  filterSearchValue: '',
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
        maxGrade: action.data.maxGrade,
        minGrade: action.data.minGrade,
        page: action.data.page,
        pageCount: action.data.pageCount,
        packUserId: action.data.packUserId,
      }
    case 'LEARN/SET-LEARN-LOADING':
      return {
        ...state,
        learnLoading: action.learnLoading,
      }
  }

  return state
}

// Actions
export const setLearnCardsAC = (data: GetCardsResponseType) => {
  return {
    type: 'LEARN/SET-LEARN-CARDS',
    data,
  } as const
}

export const setLearnLoading = (learnLoading: boolean) => {
  return {
    type: 'LEARN/SET-LEARN-LOADING',
    learnLoading,
  } as const
}

// Thunks
export const getLearnCardsTC =
  (cardsPack_id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLearnLoading(true))
    const page = 1
    const pageCount = getState().packs.pageCount

    try {
      const res = await cardsAPI.getCards({
        cardsPack_id,
        page,
        pageCount,
      })

      dispatch(setLearnCardsAC(res.data))
      dispatch(setLearnLoading(false))
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    }
  }

// Types
export type LearnInitialStateType = typeof learnInitialState
export type LearnActionsType =
  | ReturnType<typeof setLearnCardsAC>
  | ReturnType<typeof setLearnLoading>
