import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

import { setFilterToCardsFromInputSearchAC } from '../../../cards/cards-reducer'

import s from './FiltersOff.module.css'

import {
  setCurrentPacksPageAC,
  setFilterToPacksFromInputSearchAC,
  setRerenderAC,
  setSortByAllMyAC,
  setSortMinMaxCardsAC,
} from 'features/packs/packs-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const FiltersOff = () => {
  const dispatch = useAppDispatch()
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)

  const turnOffFilters = () => {
    if (sortByAllMy === 'my') {
      dispatch(setRerenderAC(false))
    }
    dispatch(setCurrentPacksPageAC(1))
    dispatch(setSortByAllMyAC('all'))
    dispatch(setSortMinMaxCardsAC(0, maxCardsCount))
    dispatch(setFilterToPacksFromInputSearchAC(''))
    dispatch(setFilterToCardsFromInputSearchAC(''))
  }

  return (
    <button disabled={appStatus === 'loading'} className={s.filtersOff} onClick={turnOffFilters}>
      <FilterAltOffIcon sx={{ color: '#646464' }} />
    </button>
  )
}
