import { CreatePackRequestType, GetPacksRequestType, packsAPI } from './packs-API'

import { AppDispatch, RootState } from 'app/store'

const packsInitialState = {
  packs: [] as PackType[],
  page: 1,
  pageCount: 10,
}

export const packsReducer = (
  state: PacksStateType = packsInitialState,
  action: PacksActionsType
): PacksStateType => {
  switch (action.type) {
    case 'PACKS/SET-PACKS':
      return { ...state, packs: [...action.packs] }
    default:
      return state
  }
}

// Actions
export const setPacksAC = (packs: PackType[]) => {
  return {
    type: 'PACKS/SET-PACKS',
    packs,
  } as const
}

// Thunks

export const getPacksTC = (data: GetPacksRequestType) => async (dispatch: AppDispatch) => {
  try {
    const res = await packsAPI.getPacks(data)

    dispatch(setPacksAC(res.data.cardPacks))
  } catch (e) {
    console.log(e)
  }
}

export const addPackTC =
  (data: CreatePackRequestType) => async (dispatch: AppDispatch, getState: () => RootState) => {
    const page = getState().packs.page
    const pageCount = getState().packs.pageCount

    try {
      await packsAPI.addPack(data)

      dispatch(getPacksTC({ page, pageCount }))
    } catch (e) {
      console.log(e)
    }
  }

// Types
type PacksStateType = typeof packsInitialState
export type PacksActionsType = ReturnType<typeof setPacksAC>

export type PackType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
  grade: number
  more_id: number
  path: string
  private: boolean
  rating: number
  shots: number
  type: string
  user_name: string
  __v: number
}
