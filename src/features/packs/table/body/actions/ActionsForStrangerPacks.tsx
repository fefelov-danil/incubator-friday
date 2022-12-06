import React, { FC } from 'react'

import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import { NavLink } from 'react-router-dom'

import { PATH } from 'common/routes/Pages'
import { setCardsPackIdInLearnAC } from 'features/learn/learn-reducer'
import s from 'features/packs/table/body/TbodyPacks.module.css'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

type ActionsForStrangerPacksPropsType = {
  packId: string
  cardsCount: number | undefined
}

export const ActionsForStrangerPacks: FC<ActionsForStrangerPacksPropsType> = ({
  packId,
  cardsCount,
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
      </div>
    </TableCell>
  )
}
