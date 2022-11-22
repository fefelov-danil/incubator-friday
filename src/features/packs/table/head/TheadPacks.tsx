import React from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import s from 'features/packs/table/head/TheadPacks.module.css'

export const TheadPacks = () => {
  const sortBy = '1name'

  const renderSortBy = (name: string, sort: string) => {
    if (sortBy === 0 + sort) {
      return (
        <TableCell>
          <span className={s.arrowTop}>
            {name} <ArrowDropDownIcon />
          </span>
        </TableCell>
      )
    }

    if (sortBy === 1 + sort) {
      return (
        <TableCell>
          <span className={s.arrowBottom}>
            {name} <ArrowDropDownIcon />
          </span>
        </TableCell>
      )
    }

    return <TableCell>{name}</TableCell>
  }

  return (
    <TableHead className={s.tableHead}>
      <TableRow>
        {renderSortBy('Name', 'name')}
        {renderSortBy('Cards', 'cardsCount')}
        {renderSortBy('Created by', 'user_name')}
        {renderSortBy('Last Updated', 'updated')}
        <TableCell align={'right'}>Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}
