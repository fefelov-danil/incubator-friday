import React, { useEffect, useRef, useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton/IconButton'
import { NavLink } from 'react-router-dom'

import { resetLearnStateAC } from '../../learn/learn-reducer'

import { Button } from 'common/button/Button'
import { PATH } from 'common/routes/Pages'
import s from 'features/cards/Cards.module.css'
import { AddNewCardModal } from 'features/cards/cardsTitleAndActions/modals/AddNewCardModal'
import { DeletePackModal } from 'features/cards/cardsTitleAndActions/modals/DeletePackModal'
import { EditPackModals } from 'features/cards/cardsTitleAndActions/modals/EditPackModals'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const CardsTitleAndActions = () => {
  const dispatch = useAppDispatch()
  const packName = useAppSelector(state => state.cards.packName)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const myId = useAppSelector(state => state.auth.profile._id)
  const userPackId = useAppSelector(state => state.cards.packUserId)

  const [openActions, setOpenActions] = useState(false)
  const actions = useRef(null as HTMLDivElement | null)

  const resetLearnStateHandler = () => {
    dispatch(resetLearnStateAC())
  }

  useEffect(() => {
    if (!openActions) return

    const handleClick = (e: any) => {
      if (!actions.current) return
      if (!actions.current.contains(e.target)) {
        setOpenActions(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [openActions])

  if (myId === userPackId) {
    return (
      <div className={s.titleAndBtn}>
        <div>
          <h1>{packName}</h1>
          <div ref={actions} className={s.actions}>
            <IconButton onClick={() => setOpenActions(!openActions)} className={s.dotsForActions}>
              <MoreVertIcon />
            </IconButton>
            <div
              className={
                openActions
                  ? `${s.actionsPopUp} ${s.actionsIsOpened}`
                  : `${s.actionsPopUp} ${s.actionsIsClosed}`
              }
            >
              <EditPackModals />
              <DeletePackModal />
              {cardsTotalCount ? (
                <NavLink className={s.action} to={PATH.LEARN} onClick={resetLearnStateHandler}>
                  <SchoolIcon sx={{ fontSize: 19 }} /> Learn
                </NavLink>
              ) : (
                <p className={s.learnDisabled}>
                  <SchoolIcon sx={{ fontSize: 19 }} /> Learn
                </p>
              )}
            </div>
          </div>
        </div>
        <AddNewCardModal />
      </div>
    )
  } else {
    return (
      <div className={s.titleAndBtn}>
        <h1>{packName}</h1>
        {cardsTotalCount ? (
          <Button>
            <NavLink className={s.learnBtn} to={PATH.LEARN} onClick={resetLearnStateHandler}>
              Learn this pack
            </NavLink>
          </Button>
        ) : (
          <Button disabled={true}>Learn this pack</Button>
        )}
      </div>
    )
  }
}
