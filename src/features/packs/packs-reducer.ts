import { AxiosError } from 'axios'

import { errorUtils } from '../../utils/errors-handler'

import {
  CreatePackRequestType,
  GetPacksRequestType,
  GetPacksResponseType,
  packsAPI,
} from './packs-API'

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
}

export const packsReducer = (
  state: PacksStateType = packsInitialState,
  action: PacksActionsType
): PacksStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
      return { ...state, ...action.data }
    case 'PACKS/SET-PAGE':
      return { ...state, page: action.page }
    case 'PACKS/SET-PAGE-COUNT':
      return { ...state, pageCount: action.count }
    case 'PACK/SET-MIN-MAX-FILTER':
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

export const setMinMaxFilterAC = (min: number, max: number) => {
  return {
    type: 'PACK/SET-MIN-MAX-FILTER',
    min,
    max,
  } as const
}

// Thunks

export const getPacksTC = (data: GetPacksRequestType) => async (dispatch: AppDispatch) => {
  try {
    const res = await packsAPI.getPacks(data)

    dispatch(setPacksAC(res.data))
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

export const addPackTC =
  (data: CreatePackRequestType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().packs.page
    const pageCount = getState().packs.pageCount

    try {
      await packsAPI.addPack(data)

      dispatch(getPacksTC({ page, pageCount }))
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    }
  }

export const deletePackTC =
  (id: string) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().packs.page
    const pageCount = getState().packs.pageCount

    try {
      await packsAPI.deletePack({ id })

      dispatch(getPacksTC({ page, pageCount }))
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    }
  }

export const updatePackTC =
  (data: PackType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().packs.page
    const pageCount = getState().packs.pageCount

    try {
      await packsAPI.updatePack(data)

      dispatch(getPacksTC({ page, pageCount }))
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    }
  }

// Types
type PacksStateType = typeof packsInitialState
export type PacksActionsType =
  | ReturnType<typeof setPacksAC>
  | ReturnType<typeof setCurrentPacksPageAC>
  | ReturnType<typeof setPagePacksCountAC>
  | ReturnType<typeof setMinMaxFilterAC>

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
