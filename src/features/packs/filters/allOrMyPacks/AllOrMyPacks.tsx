import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../../utils/hooks'
import {
  getPacksTC,
  setSortByAllMyAC,
  setSortMinMaxCardsForAllAC,
  setSortMinMaxCardsForMyAC,
} from '../../packs-reducer'

import s from './AllOrMyPacks.module.css'

export const AllOrMyPacks: React.FC = () => {
  const dispatch = useAppDispatch()
  const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)

  const minForAll = useAppSelector(state => state.packs.minForAll)
  const maxForAll = useAppSelector(state => state.packs.maxForAll)
  const minForMy = useAppSelector(state => state.packs.minForMy)
  const maxForMy = useAppSelector(state => state.packs.maxForMy)

  const changeAllOrMyPacksHandler = (my: boolean) => {
    if (my) {
      dispatch(setSortByAllMyAC('my'))
      dispatch(setSortMinMaxCardsForMyAC(minForMy, maxForMy))
      dispatch(getPacksTC())
    } else {
      dispatch(setSortByAllMyAC('all'))
      dispatch(setSortMinMaxCardsForAllAC(minForAll, maxForAll))
      dispatch(getPacksTC())
    }
  }

  return (
    <div className={s.buttons}>
      <button
        className={sortByAllMy == 'my' ? s.active : ''}
        onClick={() => changeAllOrMyPacksHandler(true)}
      >
        My
      </button>
      <button
        className={sortByAllMy == 'all' ? s.active : ''}
        onClick={() => changeAllOrMyPacksHandler(false)}
      >
        All
      </button>
    </div>
  )
}
