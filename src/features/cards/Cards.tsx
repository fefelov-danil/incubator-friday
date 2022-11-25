import React, { useEffect, useRef, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton/IconButton'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import { createNewCardTC, getCardsTC } from './cards-reduser'
import s from './Cards.module.css'

import { Button } from 'common/button/Button'
import { Paginator } from 'common/paginator/Paginator'
import { PATH } from 'common/routes/Pages'
import { CardsTable } from 'features/cards/table/CardsTable'
import { InputSearch } from 'features/packs/filters/inputSearch/InputSearch'
import {
  deletePackTC,
  setCurrentPacksPageAC,
  setPagePacksCountAC,
  updatePackTC,
} from 'features/packs/packs-reducer'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.auth.profile._id)
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const packId = useAppSelector(state => state.cards.currentPackId)
  const userPackId = useAppSelector(state => state.cards.packUserId)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)

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

  const addNewCard = () => {
    dispatch(createNewCardTC({ cardsPack_id }))
  }
  const learnToPack = () => {
    console.log('learnToPack')
  }
  const editPack = () => {
    dispatch(updatePackTC({ _id: packId, name: 'edited PACK' }))
  }
  const deletePack = () => {
    dispatch(deletePackTC(packId))
  }

  const renderMainActions = (myId: string, userId: string) => {
    let packName

    if (cardPacks) {
      packName = cardPacks.find(pack => pack._id === cardsPack_id)
      packName = packName?.name
    }

    if (myId === userId) {
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
                <button className={s.action} onClick={editPack}>
                  <EditIcon sx={{ fontSize: 19 }} /> Edit
                </button>
                <button className={s.action} onClick={deletePack}>
                  <DeleteIcon sx={{ fontSize: 19 }} /> Delete
                </button>
                <button className={s.action} onClick={learnToPack}>
                  <SchoolIcon sx={{ fontSize: 19 }} /> Learn
                </button>
              </div>
            </div>
          </div>
          <Button onClick={addNewCard}>Add New Card</Button>
        </div>
      )
    }
    if (myId !== userId) {
      return (
        <div className={s.titleAndBtn}>
          <h1>{packName}</h1>
          <Button onClick={learnToPack}>Lern to pack</Button>
        </div>
      )
    }
  }

  const setCurrentPage = (newCurrentPage: number) => {
    dispatch(setCurrentPacksPageAC(newCurrentPage))
    dispatch(getCardsTC({ cardsPack_id, page: newCurrentPage }))
  }

  const setPageItemsCount = (count: number) => {
    dispatch(setPagePacksCountAC(count))
    dispatch(getCardsTC({ cardsPack_id, pageCount: count }))
  }

  return (
    <div className={'container container-with-table'}>
      <div className={s.cards}>
        <p className={s.backToPacks}>
          <NavLink to={PATH.PACKS} className={s.backToPacks}>
            <NavigateBeforeIcon sx={{ fontSize: 26 }} />
            Back to Packs List
          </NavLink>
        </p>
        {renderMainActions(myId, userPackId)}
        <div className={s.search}>
          <p className={s.filterName}>Search</p>
          <InputSearch whose={'cards'} placeholder={'Provide your text'} />
        </div>
        <CardsTable />
        <Paginator
          name={'CARDS'}
          currentPage={page}
          onPageChange={setCurrentPage}
          onPageItemsCountChange={setPageItemsCount}
          pageSize={pageCount}
          portionSize={5}
          totalItemsCount={cardsTotalCount}
        />
      </div>
    </div>
  )
}
