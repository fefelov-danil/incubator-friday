import { AxiosError } from 'axios'

import { setAppStatusAC } from '../../app/app-reducer'
import { errorUtils } from '../../utils/errors-handler'
import { setCurrentPackIdAC } from '../cards/cards-reducer'

import { CreatePackRequestType, GetPacksResponseType, packsAPI } from './packs-API'

import { AppDispatch, RootState } from 'app/store'

const packsInitialState = {
  cardPacks: null as PackType[] | null,
  page: 1,
  pageCount: 5,
  cardPacksTotalCount: 0,
  maxCardsCount: 100,
  minCardsCount: 0,
  min: 0,
  max: 100,
  sortByAllMy: 'all' as 'all' | 'my',
  filterSearchValue: '',
  sortPacksValue: '0updated',
  rerender: true,
  coverImg: undefined as undefined | string,
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
        minCardsCount: action.data.minCardsCount,
        maxCardsCount: action.data.maxCardsCount,
      }
    case 'PACKS/SET-PAGE':
      return { ...state, page: action.page }
    case 'PACKS/SET-PAGE-COUNT':
      return { ...state, pageCount: action.count }
    case 'PACKS/SET-SORT-MY-ALL':
      return { ...state, sortByAllMy: action.sortByAllMy }
    case 'PACKS/SET-SORT-MIN-MAX-CARDS':
      return { ...state, min: action.min, max: action.max }
    case 'PACKS/SET-FILTER-TO-PACKS-FROM-INPUT-SEARCH':
      return { ...state, filterSearchValue: action.searchValue }
    case 'PACKS/SET-SORT-PACKS-VALUE':
      return { ...state, sortPacksValue: action.sortPacksValue }
    case 'PACKS/SET-RERENDER':
      return { ...state, rerender: action.rerender }
    case 'PACKS/SET-COVER-IMG':
      return { ...state, coverImg: action.coverImg }
    default:
      return state
  }
}

// Actions
export const setCoverImgAC = (coverImg: undefined | string) => {
  return {
    type: 'PACKS/SET-COVER-IMG',
    coverImg,
  } as const
}

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

export const setFilterToPacksFromInputSearchAC = (searchValue: string) => {
  return {
    type: 'PACKS/SET-FILTER-TO-PACKS-FROM-INPUT-SEARCH',
    searchValue,
  } as const
}

export const setSortPacksValueAC = (sortPacksValue: string) => {
  return {
    type: 'PACKS/SET-SORT-PACKS-VALUE',
    sortPacksValue,
  } as const
}

export const setRerenderAC = (rerender: boolean) => {
  return {
    type: 'PACKS/SET-RERENDER',
    rerender,
  } as const
}

export const addNewPackAC = (name: string) => {
  return {
    type: 'PACKS/ADD-NEW-PACK',
    name,
  } as const
}

// Thunks

export const getPacksTC =
  (changedSortByAllMy: boolean = false) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setAppStatusAC('loading'))
    const page = getState().packs.page
    const pageCount = getState().packs.pageCount
    const myId = getState().auth.profile._id
    const sortByAllMy = getState().packs.sortByAllMy
    const min = changedSortByAllMy ? undefined : getState().packs.min
    const max = changedSortByAllMy ? undefined : getState().packs.max
    const filterSearchValue = getState().packs.filterSearchValue
    const sortPacksValue = getState().packs.sortPacksValue

    const user_id = sortByAllMy === 'all' ? '' : myId

    try {
      const res = await packsAPI.getPacks({
        page,
        pageCount,
        user_id,
        min,
        max,
        packName: filterSearchValue,
        sortPacks: sortPacksValue,
      })

      dispatch(setPacksAC(res.data))

      return res.data
    } catch (err) {
      const error = err as Error | AxiosError<{ error: string }>

      errorUtils(error, dispatch)
    } finally {
      dispatch(setAppStatusAC('succeeded'))
    }
  }

export const addPackTC = (data: CreatePackRequestType) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    await packsAPI.addPack(data)

    dispatch(getPacksTC())
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  } finally {
    dispatch(setAppStatusAC('succeeded'))
  }
}

export const deletePackTC = (id: string, editFrom?: 'cards') => async (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    await packsAPI.deletePack({ id })
    dispatch(setCurrentPackIdAC(''))
    editFrom !== 'cards' && dispatch(getPacksTC())
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  }
}

export const updatePackTC = (data: PackType) => async (dispatch: AppDispatch) => {
  dispatch(setAppStatusAC('loading'))
  try {
    await packsAPI.updatePack(data)

    dispatch(getPacksTC())
  } catch (err) {
    const error = err as Error | AxiosError<{ error: string }>

    errorUtils(error, dispatch)
  } finally {
    dispatch(setAppStatusAC('succeeded'))
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
  | ReturnType<typeof setFilterToPacksFromInputSearchAC>
  | ReturnType<typeof setSortPacksValueAC>
  | ReturnType<typeof setRerenderAC>
  | ReturnType<typeof addNewPackAC>
  | ReturnType<typeof setCoverImgAC>

export type PackType = {
  _id: string
  user_id?: string
  deckCover?: undefined | string
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
