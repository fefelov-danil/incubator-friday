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
  setSortMinMaxCardsAC,
} from 'features/packs/packs-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const FiltersOff = () => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.appStatus)
  const page = useAppSelector(state => state.packs.page)
  const filterSearchValue = useAppSelector(state => state.packs.filterSearchValue)
  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)
  const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)

  const turnOffFilters = async () => {
    if (
      page === 1 &&
      filterSearchValue === '' &&
      sortByAllMy === 'all' &&
      min === 0 &&
      max === maxCardsCount
    ) {
      return
    }

    dispatch(setCurrentPacksPageAC(1))
    dispatch(setFilterToPacksFromInputSearchAC(''))
    dispatch(setFilterToCardsFromInputSearchAC(''))
    dispatch(setSortByAllMyAC('all'))
    dispatch(setRerenderAC(false))
    const res = await dispatch(getPacksTC(true))

    dispatch(setSortMinMaxCardsAC(0, res ? res.maxCardsCount : 150))
  }

  return (
    <button disabled={appStatus === 'loading'} className={s.filtersOff} onClick={turnOffFilters}>
      <FilterAltOffIcon sx={{ color: '#646464' }} />
    </button>
  )
}
