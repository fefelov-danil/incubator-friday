import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

import s from './FiltersOff.module.css'

import {
  getPacksTC,
  setCurrentPacksPageAC,
  setFilterToPacksFromInputSearchAC,
  setSortByAllMyAC,
  setSortMinMaxCardsForAllAC,
} from 'features/packs/packs-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const FiltersOff = () => {
  const dispatch = useAppDispatch()
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

  const turnOffFilters = () => {
    dispatch(setCurrentPacksPageAC(1))
    dispatch(setSortByAllMyAC('all'))
    dispatch(setSortMinMaxCardsForAllAC(0, maxCardsCount))
    dispatch(setFilterToPacksFromInputSearchAC(''))
    dispatch(getPacksTC())
  }

  return (
    <button className={s.filtersOff} onClick={turnOffFilters}>
      <FilterAltOffIcon sx={{ color: '#646464' }} />
    </button>
  )
}
