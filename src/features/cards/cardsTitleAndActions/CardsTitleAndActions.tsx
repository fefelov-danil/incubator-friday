import React, { useEffect, useRef, useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton/IconButton'
import { NavLink } from 'react-router-dom'

import { Button } from 'common/button/Button'
import { PATH } from 'common/routes/Pages'
import s from 'features/cards/Cards.module.css'
import { AddNewCardModal } from 'features/cards/cardsTitleAndActions/modals/AddNewCardModal'
import { DeleteModal } from 'features/cards/cardsTitleAndActions/modals/DeleteModal'
import { EditModals } from 'features/cards/cardsTitleAndActions/modals/EditModals'
import { useAppSelector } from 'utils/hooks'

export const CardsTitleAndActions = () => {
  const packName = useAppSelector(state => state.cards.packName)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const myId = useAppSelector(state => state.auth.profile._id)
  const userPackId = useAppSelector(state => state.cards.packUserId)

  const [openActions, setOpenActions] = useState(false)
  const actions = useRef(null as HTMLDivElement | null)

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
              <EditModals />
              <DeleteModal />
              {cardsTotalCount ? (
                <NavLink className={s.action} to={PATH.LEARN}>
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
            <NavLink className={s.learnBtn} to={PATH.LEARN}>
              Learn to pack
            </NavLink>
          </Button>
        ) : (
          <Button disabled={true}>Learn to pack</Button>
        )}
      </div>
    )
  }
}
