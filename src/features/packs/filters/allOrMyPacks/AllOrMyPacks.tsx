import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../../utils/hooks'
import { getPacksTC, setSortByAllMyAC } from '../../packs-reducer'

import s from './AllOrMyPacks.module.css'

export const AllOrMyPacks: React.FC = () => {
  const dispatch = useAppDispatch()
  const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)

  const changeAllOrMyPacksHandler = (my: boolean) => {
    if (my) {
      dispatch(setSortByAllMyAC('my'))
      dispatch(getPacksTC({}))
    } else {
      dispatch(setSortByAllMyAC('all'))
      dispatch(getPacksTC({}))
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
