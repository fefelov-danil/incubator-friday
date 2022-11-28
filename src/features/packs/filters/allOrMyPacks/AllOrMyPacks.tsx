import React from 'react'

import { useAppDispatch, useAppSelector } from '../../../../utils/hooks'
import { setSortByAllMyAC } from '../../packs-reducer'

import s from './AllOrMyPacks.module.css'

export const AllOrMyPacks: React.FC = () => {
  const dispatch = useAppDispatch()
  const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const changeAllOrMyPacksHandler = (whosePacks: 'all' | 'my') => {
    dispatch(setSortByAllMyAC(whosePacks))
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
