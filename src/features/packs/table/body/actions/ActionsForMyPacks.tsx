import React, { FC } from 'react'

import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import { NavLink } from 'react-router-dom'

import { PATH } from 'common/routes/Pages'
import { setCardsPackIdInLearnAC } from 'features/learn/learn-reducer'
import { DeletePackModal } from 'features/packs/table/body/modals/DeletePackModal'
import { EditPackModal } from 'features/packs/table/body/modals/EditPackModal'
import s from 'features/packs/table/body/TbodyPacks.module.css'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

type ActionsForMyPacksPropsType = {
  packId: string
  cardsCount: number | undefined
  packName: string
  packPrivate: boolean
  deckCover: string | undefined
}

export const ActionsForMyPacks: FC<ActionsForMyPacksPropsType> = ({
  packId,
  cardsCount,
  packName,
  packPrivate,
  deckCover,
}) => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.appStatus)

  const studyPack = (packId: string) => {
    dispatch(setCardsPackIdInLearnAC(packId))
  }

  return (
    <TableCell align="right">
      <div className={s.actions}>
        {cardsCount ? (
          <NavLink to={PATH.LEARN} onClick={() => studyPack(packId)}>
            <IconButton disabled={appStatus === 'loading'}>
              <SchoolIcon sx={{ fontSize: 19 }} />
            </IconButton>
          </NavLink>
        ) : (
          <IconButton disabled={true}>
            <SchoolIcon sx={{ fontSize: 19 }} />
          </IconButton>
        )}

        <EditPackModal
          packId={packId}
          packName={packName ? packName : ''}
          packPrivate={packPrivate ? packPrivate : false}
          deckCover={deckCover}
        />
        <DeletePackModal packId={packId} packName={packName ? packName : ''} />
      </div>
    </TableCell>
  )
}
