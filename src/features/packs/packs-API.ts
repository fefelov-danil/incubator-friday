import axios from 'axios'

import { PackType } from './packs-reducer'

export const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
  withCredentials: true,
})

export const packsAPI = {
  getPacks(data: GetPacksRequestType) {
    return instance.get<GetPacksResponseType>('/cards/pack', { params: { ...data } })
  },
  addPack(data: CreatePackRequestType) {
    return instance.post('/cards/pack', data)
  },
  deletePack(data: { id: string }) {
    return instance.delete('/cards/pack', { params: { ...data } })
  },
  updatePack(data: UpdatePackRequestType) {
    return instance.put('/cards/pack', data)
  },
}

// types
export type GetPacksRequestType = {
  user_id?: string
  packName?: string
  min?: number
  max?: number
  sortPacks?: string
  page?: number
  pageCount?: number
  block?: boolean
}

export type GetPacksResponseType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
}

export type CreatePackRequestType = {
  cardsPack: {
    name?: string
    deckCover?: string
    private?: boolean
  }
}

export type UpdatePackRequestType = {
  cardsPack: PackType
}
