import React from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import s from './TheadCards.module.css'

export const TheadCards = () => {
  const sortBy = '1updated'

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
        {renderSortBy('Question', 'question')}
        {renderSortBy('Answer', 'answer')}
        {renderSortBy('Last Updated', 'updated')}
        {renderSortBy('Grade', 'grade')}
      </TableRow>
    </TableHead>
  )
}
