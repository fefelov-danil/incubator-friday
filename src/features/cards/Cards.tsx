import React, { useEffect, useRef, useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton/IconButton'
import { Navigate, NavLink } from 'react-router-dom'

import s from './Cards.module.css'

import { Button } from 'common/button/Button'
import { Paginator } from 'common/paginator/Paginator'
import { PATH } from 'common/routes/Pages'
import { getCardsTC, setCurrentCardsPageAC } from 'features/cards/cards-reducer'
import { AddNewCardModal } from 'features/cards/modals/AddNewCardModal'
import { DeleteModal } from 'features/cards/modals/DeleteModal'
import { EditModals } from 'features/cards/modals/EditModals'
import { CardsTable } from 'features/cards/table/CardsTable'
import { setCardsPackIdInLearnAC } from 'features/learn/learn-reducer'
import { InputSearch } from 'features/packs/filters/inputSearch/InputSearch'
import { setPagePacksCountAC } from 'features/packs/packs-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.auth.profile._id)
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const userPackId = useAppSelector(state => state.cards.packUserId)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const filterSearchValue = useAppSelector(state => state.cards.filterSearchValue)

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

  useEffect(() => {
    dispatch(setCardsPackIdInLearnAC(cardsPack_id))
  }, [cardsPack_id])

  useEffect(() => {
    dispatch(getCardsTC())
  }, [page, pageCount, filterSearchValue])

  const renderMainActions = (myId: string, userId: string) => {
    let packName

    if (cardPacks) {
      const pack = cardPacks.find(pack => pack._id === cardsPack_id)

      packName = pack?.name
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
                <EditModals />
                <DeleteModal />
                <NavLink className={s.action} to={PATH.LEARN}>
                  <SchoolIcon sx={{ fontSize: 19 }} /> Learn
                </NavLink>
              </div>
            </div>
          </div>
          <AddNewCardModal />
        </div>
      )
    }
    if (myId !== userId) {
      return (
        <div className={s.titleAndBtn}>
          <h1>{packName}</h1>
          <Button>
            <NavLink className={s.learnBtn} to={PATH.LEARN}>
              Learn to pack
            </NavLink>
          </Button>
        </div>
      )
    }
  }

  const setCurrentPage = (newCurrentPage: number) => {
    dispatch(setCurrentCardsPageAC(newCurrentPage))
  }

  const setPageItemsCount = (count: number) => {
    dispatch(setPagePacksCountAC(count))
  }

  if (cardsPack_id === '') {
    return <Navigate to={PATH.PACKS} />
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
