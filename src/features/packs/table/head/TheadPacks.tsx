import React from 'react'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { setSortPacksValueAC } from '../../packs-reducer'

import s from './TheadPacks.module.css'

import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const TheadPacks = () => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.appStatus)

  const onClickHandler = (sort: string) => {
    dispatch(setSortPacksValueAC(sort))
  }
  const sortPacksValue = useAppSelector(state => state.packs.sortPacksValue)

  const renderSortBy = (name: string, sort: string) => {
    if (sortPacksValue === '1' + sort) {
      return (
        <TableCell>
          <span
            className={appStatus === 'loading' ? `${s.disabled} ${s.arrowTop}` : s.arrowTop}
            onClick={() => onClickHandler('0' + sort)}
          >
            {name} <ArrowDropDownIcon />
          </span>
        </TableCell>
      )
    }

    if (sortPacksValue === '0' + sort) {
      return (
        <TableCell>
          <span
            className={appStatus === 'loading' ? `${s.disabled} ${s.arrowBottom}` : s.arrowBottom}
            onClick={() => onClickHandler('1' + sort)}
          >
            {name} <ArrowDropDownIcon />
          </span>
        </TableCell>
      )
    }

    return (
      <TableCell>
        <span
          className={appStatus === 'loading' ? s.disabled : ''}
          onClick={() => onClickHandler('0' + sort)}
        >
          {' '}
          {name}{' '}
        </span>
      </TableCell>
    )
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
