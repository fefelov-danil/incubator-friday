import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../utils/hooks'
import { getPacksTC, setSortByAllMyAC, setSortMinMaxCardsAC } from '../../packs-reducer'

import s from './AllOrMyPacks.module.css'

export const AllOrMyPacks: React.FC = () => {
  const dispatch = useAppDispatch()
  const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)
  const max = useAppSelector(state => state.packs.maxCardsCount)

  const changeAllOrMyPacksHandler = (my: boolean) => {
    if (my) {
      dispatch(setSortByAllMyAC('my'))
      dispatch(setSortMinMaxCardsAC(0, 0))
      dispatch(getPacksTC())
    } else {
      dispatch(setSortByAllMyAC('all'))
      dispatch(setSortMinMaxCardsAC(0, 0))
      dispatch(getPacksTC())
    }
  }

  useEffect(() => {
    dispatch(setSortMinMaxCardsAC(0, max))
  }, [max])

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
