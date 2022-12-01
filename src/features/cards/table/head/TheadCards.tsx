import React from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import s from './TheadCards.module.css'

import { getCardsTC, setSortCardsValueAC } from 'features/cards/cards-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const TheadCards = () => {
  const dispatch = useAppDispatch()
  const sortCardsValue = useAppSelector(state => state.cards.sortCardsValue)

  const onClickHandler = (sort: string) => {
    dispatch(setSortCardsValueAC(sort))
    dispatch(getCardsTC())
  }

  const renderSortBy = (name: string, sort: string) => {
    if (sortCardsValue === '1' + sort) {
      return (
        <TableCell>
          <span className={s.arrowTop} onClick={() => onClickHandler('0' + sort)}>
            {name} <ArrowDropDownIcon />
          </span>
        </TableCell>
      )
    }

    if (sortCardsValue === '0' + sort) {
      return (
        <TableCell>
          <span className={s.arrowBottom} onClick={() => onClickHandler('1' + sort)}>
            {name} <ArrowDropDownIcon />
          </span>
        </TableCell>
      )
    }

    return (
      <TableCell>
        <span onClick={() => onClickHandler('0' + sort)}>{name}</span>
      </TableCell>
    )
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
