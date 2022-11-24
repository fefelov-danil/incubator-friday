import { AxiosError } from 'axios'

import { errorUtils } from '../../utils/errors-handler'

import { CreatePackRequestType, GetPacksResponseType, packsAPI } from './packs-API'

import { AppDispatch, RootState } from 'app/store'

const packsInitialState = {
  cardPacks: null as PackType[] | null,
  page: 1,
  pageCount: 5,
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  min: 0,
  max: 0,
  sortByAllMy: 'all' as 'all' | 'my',
}

export const packsReducer = (
  state: PacksStateType = packsInitialState,
  action: PacksActionsType
): PacksStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
      return {
        ...state,
        cardPacks: action.data.cardPacks,
        page: action.data.page,
        pageCount: action.data.pageCount,
        cardPacksTotalCount: action.data.cardPacksTotalCount,
        maxCardsCount: action.data.maxCardsCount,
        minCardsCount: action.data.minCardsCount,
        max: state.max === 0 ? action.data.maxCardsCount : 0,
      }
    case 'PACKS/SET-PAGE':
      return { ...state, page: action.page }
    case 'PACKS/SET-PAGE-COUNT':
      return { ...state, pageCount: action.count }
    case 'PACKS/SET-SORT-MY-ALL':
      return { ...state, sortByAllMy: action.sortByAllMy }
    case 'PACKS/SET-SORT-MIN-MAX-CARDS':
      return { ...state, min: action.min, max: action.max }
    default:
      return state
  }
}

// Actions
export const setPacksAC = (data: GetPacksResponseType) => {
  return {
    type: 'PACKS/SET-PACKS',
    data,
  } as const
}

export const setCurrentPacksPageAC = (page: number) => {
  return {
    type: 'PACKS/SET-PAGE',
    page,
  } as const
}

export const setPagePacksCountAC = (count: number) => {
  return {
    type: 'PACKS/SET-PAGE-COUNT',
    count,
  } as const
}

export const setSortByAllMyAC = (sortByAllMy: 'all' | 'my') => {
  return {
    type: 'PACKS/SET-SORT-MY-ALL',
    sortByAllMy,
  } as const
}

export const setSortMinMaxCardsAC = (min: number, max: number) => {
  return {
    type: 'PACKS/SET-SORT-MIN-MAX-CARDS',
    min,
    max,
  } as const
}

// Thunks

export const getPacksTC = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const page = getState().packs.page
  const pageCount = getState().packs.pageCount
  const myId = getState().auth.profile._id
  const sortByAllMy = getState().packs.sortByAllMy
  const min = getState().packs.min
  const max = getState().packs.max

  const user_id = sortByAllMy === 'all' ? '' : myId

  try {
    const res = await packsAPI.getPacks({ page, pageCount, user_id, min, max })

    dispatch(setPacksAC(res.data))
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

export const addPackTC = (data: CreatePackRequestType) => async (dispatch: AppDispatch) => {
  try {
    await packsAPI.addPack(data)

    dispatch(getPacksTC())
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

export const deletePackTC = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await packsAPI.deletePack({ id })

    dispatch(getPacksTC())
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

export const updatePackTC = (data: PackType) => async (dispatch: AppDispatch) => {
  try {
    await packsAPI.updatePack(data)

    dispatch(getPacksTC())
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

// Types
export type PacksStateType = typeof packsInitialState
export type PacksActionsType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof setCurrentPacksPageAC>
  | ReturnType<typeof setPagePacksCountAC>
  | ReturnType<typeof setSortByAllMyAC>
  | ReturnType<typeof setSortMinMaxCardsAC>

export type PackType = {
  _id: string
  user_id?: string
  name?: string
  cardsCount?: number
  created?: string
  updated?: string
  grade?: number
  more_id?: number
  path?: string
  private?: boolean
  rating?: number
  shots?: number
  type?: string
  user_name?: string
  __v?: number
}
