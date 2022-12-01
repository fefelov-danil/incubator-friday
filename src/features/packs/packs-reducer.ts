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
  maxCardsCount: 0,
  minCardsCount: 0,
  minForAll: 0,
  maxForAll: 0,
  minForMy: 0,
  maxForMy: 0,
  sortByAllMy: 'all',
  filterSearchValue: '',
  sortPacksValue: '0updated',
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
        maxForAll:
          state.maxForAll === 0 && state.sortByAllMy === 'all'
            ? action.data.maxCardsCount
            : state.maxForAll,
        maxForMy:
          state.maxForMy === 0 && state.sortByAllMy === 'my'
            ? action.data.maxCardsCount
            : state.maxForMy,
      }
    case 'PACKS/SET-PAGE':
      return { ...state, page: action.page }
    case 'PACKS/SET-PAGE-COUNT':
      return { ...state, pageCount: action.count }
    case 'PACKS/SET-SORT-MY-ALL':
      return { ...state, sortByAllMy: action.sortByAllMy }
    case 'PACKS/SET-SORT-MIN-MAX-CARDS-All':
      return { ...state, minForAll: action.minForAll, maxForAll: action.maxForAll }
    case 'PACKS/SET-SORT-MIN-MAX-CARDS-MY':
      return { ...state, minForMy: action.minForMy, maxForMy: action.maxForMy }
    case 'PACKS/SET-FILTER-TO-PACKS-FROM-INPUT-SEARCH':
      return { ...state, filterSearchValue: action.searchValue }
    case 'PACKS/SET-SORT-PACKS-VALUE':
      return { ...state, sortPacksValue: action.sortPacksValue }
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

export const setSortByAllMyAC = (sortByAllMy: string) => {
  return {
    type: 'PACKS/SET-SORT-MY-ALL',
    sortByAllMy,
  } as const
}

export const setSortMinMaxCardsForAllAC = (minForAll: number, maxForAll: number) => {
  return {
    type: 'PACKS/SET-SORT-MIN-MAX-CARDS-All',
    minForAll,
    maxForAll,
  } as const
}

export const setSortMinMaxCardsForMyAC = (minForMy: number, maxForMy: number) => {
  return {
    type: 'PACKS/SET-SORT-MIN-MAX-CARDS-MY',
    minForMy,
    maxForMy,
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

// Thunks

export const getPacksTC = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(setAppStatusAC('loading'))
  const page = getState().packs.page
  const pageCount = getState().packs.pageCount
  const myId = getState().auth.profile._id
  const sortByAllMy = getState().packs.sortByAllMy
  const min = sortByAllMy === 'all' ? getState().packs.minForAll : getState().packs.minForMy
  const max = sortByAllMy === 'all' ? getState().packs.maxForAll : getState().packs.maxForMy
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
  | ReturnType<typeof setSortMinMaxCardsForAllAC>
  | ReturnType<typeof setSortMinMaxCardsForMyAC>
  | ReturnType<typeof setFilterToPacksFromInputSearchAC>
  | ReturnType<typeof setSortPacksValueAC>

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
