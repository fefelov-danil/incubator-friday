import React from 'react'

import s from './Learn.module.css'

import { useAppSelector } from 'utils/hooks'

const cardPacks = [
  {
    _id: '638084b1b9e1820004d68bce',
    user_id: '637740a58b558b0004081b05',
    user_name: 'ArtemIvchenko',
    private: false,
    name: 'New Update Name',
    path: '/def',
    grade: 0,
    shots: 0,
    cardsCount: 17,
    type: 'pack',
    rating: 0,
    created: '2022-11-25T09:02:41.892Z',
    updated: '2022-11-29T09:39:45.180Z',
    more_id: '637740a58b558b0004081b05',
    __v: 0,
    deckCover: null,
  },
  {
    _id: '63591f333332fc0d6c53e8b2',
    user_id: '63034d98e05c8662344be53e',
    user_name: 'angor78',
    private: false,
    name: '222',
    path: '/def',
    grade: 0,
    shots: 0,
    cardsCount: 2,
    type: 'pack',
    rating: 0,
    created: '2022-10-26T11:51:15.537Z',
    updated: '2022-11-29T09:22:26.664Z',
    more_id: '63034d98e05c8662344be53e',
    __v: 0,
  },
  {
    _id: '6380cf72b9e1820004d68c02',
    user_id: '637b335fa83e5500043db551',
    user_name: 'splin.shady1@gmail.com',
    private: false,
    name: 'PAAACK!!!',
    path: '/def',
    grade: 0,
    shots: 0,
    cardsCount: 0,
    type: 'pack',
    rating: 0,
    created: '2022-11-25T14:21:38.266Z',
    updated: '2022-11-29T08:17:21.581Z',
    more_id: '637b335fa83e5500043db551',
    __v: 0,
  },
  {
    _id: '622b52e929bee9000469654f',
    user_id: '62242f0a6af372000457ad68',
    user_name: 'Anatoliy',
    private: false,
    name: 'English phrases',
    path: '/def',
    grade: 0,
    shots: 0,
    cardsCount: 30,
    type: 'pack',
    rating: 0,
    created: '2022-03-11T13:47:21.244Z',
    updated: '2022-11-29T05:36:40.125Z',
    more_id: '62242f0a6af372000457ad68',
    __v: 0,
    deckCover: null,
  },
  {
    _id: '6384fbe604158a0004fe255f',
    user_id: '6374831c9913ce00045f9f5f',
    user_name: 'Vladislavs',
    private: false,
    name: 'Modal is done ;)',
    path: '/def',
    grade: 0,
    shots: 0,
    cardsCount: 0,
    type: 'pack',
    rating: 0,
    created: '2022-11-28T18:20:22.941Z',
    updated: '2022-11-28T20:42:09.957Z',
    more_id: '6374831c9913ce00045f9f5f',
    __v: 0,
    deckCover: null,
  },
]

export const Learn = () => {
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)

  let packName

  if (cardPacks) {
    const pack = cardPacks.find(pack => pack._id === cardsPack_id)

    packName = pack?.name
  }

  return (
    <div className={`container ${s.learn}`}>
      <h1>{packName} </h1>
      <p className={s.question}>Question: </p>
    </div>
  )
}
