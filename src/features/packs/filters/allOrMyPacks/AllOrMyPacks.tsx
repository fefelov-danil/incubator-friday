import React from 'react'

import {
  getPacksTC,
  setCurrentPacksPageAC,
  setFilterToPacksFromInputSearchAC,
  setRerenderAC,
  setSortByAllMyAC,
  setSortMinMaxCardsAC,
} from '../../packs-reducer'

import s from './AllOrMyPacks.module.css'

import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const AllOrMyPacks: React.FC = () => {
  const dispatch = useAppDispatch()
  const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const changeAllOrMyPacksHandler = async (whosePacks: 'all' | 'my') => {
    dispatch(setSortByAllMyAC(whosePacks))
    dispatch(setFilterToPacksFromInputSearchAC(''))
    dispatch(setRerenderAC(false))
    const res = await dispatch(getPacksTC(true))

    const maxCardsCount = res ? res.maxCardsCount : 150

    dispatch(setSortMinMaxCardsAC(0, maxCardsCount))
    dispatch(setCurrentPacksPageAC(1))
  }

  return (
    <div className={s.buttons}>
      <button
        disabled={appStatus === 'loading'}
        className={`${sortByAllMy == 'my' ? s.active : ''} ${s.my}`}
        onClick={() => changeAllOrMyPacksHandler('my')}
      >
        My
      </button>
      <button
        disabled={appStatus === 'loading'}
        className={`${sortByAllMy == 'all' ? s.active : ''} ${s.all}`}
        onClick={() => changeAllOrMyPacksHandler('all')}
      >
        All
      </button>
    </div>
  )
}
