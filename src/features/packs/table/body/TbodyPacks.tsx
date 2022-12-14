import React from 'react'

import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { NavLink } from 'react-router-dom'

import defaultCover from 'assets/images/default-pack-cover.png'
import { PATH } from 'common/routes/Pages'
import { resetCardStateAC, setCurrentPackIdAC } from 'features/cards/cards-reducer'
import { ActionsForMyPacks } from 'features/packs/table/body/actions/ActionsForMyPacks'
import { ActionsForStrangerPacks } from 'features/packs/table/body/actions/ActionsForStrangerPacks'
import s from 'features/packs/table/body/TbodyPacks.module.css'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const TbodyPacks = () => {
  const dispatch = useAppDispatch()

  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const myId = useAppSelector(state => state.auth.profile._id)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const openPack = (cardsPack_id: string) => {
    dispatch(resetCardStateAC())
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
              <TableCell className={s.packName}>
                <NavLink to={PATH.CARDS}>
                  <button
                    className={s.packNameContainer}
                    disabled={appStatus === 'loading'}
                    onClick={() => openPack(pack._id)}
                  >
                    <img className={s.packCover} src={pack.deckCover || defaultCover} alt="cover" />
                    {pack.name}
                  </button>
                </NavLink>
              </TableCell>
              <TableCell align="right">{pack.cardsCount}</TableCell>
              <TableCell align="right">
                <span className={s.userName}>{pack.user_name}</span>
              </TableCell>
              <TableCell align="right">{date}</TableCell>
              {myId === pack.user_id ? (
                <ActionsForMyPacks
                  packId={pack._id}
                  cardsCount={pack.cardsCount}
                  packName={pack.name ? pack.name : ''}
                  packPrivate={pack.private ? pack.private : false}
                  deckCover={pack.deckCover}
                />
              ) : (
                <ActionsForStrangerPacks packId={pack._id} cardsCount={pack.cardsCount} />
              )}
            </TableRow>
          )
        })}
      </TableBody>
    )
  )
}
