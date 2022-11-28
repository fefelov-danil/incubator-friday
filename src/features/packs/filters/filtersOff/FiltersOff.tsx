import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

import { setFilterToCardsFromInputSearchAC } from '../../../cards/cards-reducer'

import s from './FiltersOff.module.css'

import {
  getPacksTC,
  setCurrentPacksPageAC,
  setFilterToPacksFromInputSearchAC,
  setRerenderAC,
  setSortByAllMyAC,
} from 'features/packs/packs-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const FiltersOff = () => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.appStatus)

  const turnOffFilters = () => {
    dispatch(setCurrentPacksPageAC(1))
    dispatch(setSortByAllMyAC('all'))
    dispatch(setFilterToPacksFromInputSearchAC(''))
    dispatch(setFilterToCardsFromInputSearchAC(''))
    dispatch(setRerenderAC(false))
    dispatch(getPacksTC(true))
  }

  return (
    <button disabled={appStatus === 'loading'} className={s.filtersOff} onClick={turnOffFilters}>
      <FilterAltOffIcon sx={{ color: '#646464' }} />
    </button>
  )
}
