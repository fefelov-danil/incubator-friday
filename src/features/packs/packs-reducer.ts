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
  cardPacks: [] as PackType[],
  page: 1,
  pageCount: 10,
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
}

export const packsReducer = (
  state: PacksStateType = packsInitialState,
  action: PacksActionsType
): PacksStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
      return { ...state, ...action.data }
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
      await packsAPI.updatePack({ cardsPack: { ...data } })

      dispatch(getPacksTC({ page, pageCount }))
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    }
  }

// Types
type PacksStateType = typeof packsInitialState
export type PacksActionsType = ReturnType<typeof setPacksAC>

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
