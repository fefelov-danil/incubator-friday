import React from 'react'

import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'

import s from './FiltersOff.module.css'

type FiltersOffPropsType = {
  turnOffFilters: () => void
}

export const FiltersOff: React.FC<FiltersOffPropsType> = ({ turnOffFilters }) => {
  return (
    <button className={s.filtersOff} onClick={turnOffFilters}>
      <FilterAltOffIcon sx={{ color: '#646464' }} />
    </button>
  )
}
