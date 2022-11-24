import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { NavLink } from 'react-router-dom'

import { PATH } from '../../../../common/routes/Pages'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks'
import { getCardsTC, setCurrentPackIdAC } from '../../../cards/cards-reduser'
import { deletePackTC, updatePackTC } from '../../packs-reducer'

import s from 'features/packs/table/body/TbodyPacks.module.css'

export const TbodyPacks = () => {
  const dispatch = useAppDispatch()

  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const myId = useAppSelector(state => state.auth.profile._id)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const studyPack = (packId: string) => {
    console.log('study', packId)
  }
  const editPack = (packId: string) => {
    dispatch(updatePackTC({ _id: packId, name: 'edited PACK' })) //  _id колоды обязательно
  }
  const deletePack = (packId: string) => {
    console.log('delete pack')
    dispatch(deletePackTC(packId)) //  _id колоды
  }

  const renderActions = (myId: string, userId: string, packId: string) => {
    if (myId === userId) {
      return (
        <TableCell className={s.actions} align="right">
          <IconButton disabled={appStatus === 'loading'} onClick={() => studyPack(packId)}>
            <SchoolIcon sx={{ fontSize: 19 }} />
          </IconButton>
          <IconButton disabled={appStatus === 'loading'} onClick={() => editPack(packId)}>
            <EditIcon sx={{ fontSize: 19 }} />
          </IconButton>
          <IconButton disabled={appStatus === 'loading'} onClick={() => deletePack(packId)}>
            <DeleteIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </TableCell>
      )
    } else {
      return (
        <TableCell className={s.actions} align="right">
          <IconButton disabled={appStatus === 'loading'} onClick={() => studyPack(packId)}>
            <SchoolIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </TableCell>
      )
    }
  }

  const openPack = (cardsPack_id: string) => {
    dispatch(getCardsTC({ cardsPack_id, page, pageCount }))
    dispatch(setCurrentPackIdAC(cardsPack_id))
  }

  return (
    cardPacks && (
      <TableBody className={s.tableBody}>
        {cardPacks.map(pack => {
          const date =
            new Date(pack.updated ? pack.updated : '').getDate() +
            '.' +
            (new Date(pack.updated ? pack.updated : '').getMonth() + 1) +
            '.' +
            new Date(pack.updated ? pack.updated : '').getFullYear()

          return (
            <TableRow key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell className={s.packName} component="th" scope="row">
                <NavLink to={PATH.CARDS}>
                  <button disabled={appStatus === 'loading'} onClick={() => openPack(pack._id)}>
                    {pack.name}
                  </button>
                </NavLink>
              </TableCell>
              <TableCell align="right">{pack.cardsCount}</TableCell>
              <TableCell align="right">{pack.user_name}</TableCell>
              <TableCell align="right">{date}</TableCell>
              {renderActions(myId, pack.user_id ? pack.user_id : '', pack._id)}
            </TableRow>
          )
        })}
      </TableBody>
    )
  )
}
