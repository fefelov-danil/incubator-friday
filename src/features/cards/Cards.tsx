import React from 'react'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import { createNewCardTC, getCardsTC } from './cards-reduser'
import s from './Cards.module.css'

import { Button } from 'common/button/Button'
import { Paginator } from 'common/paginator/Paginator'
import { PATH } from 'common/routes/Pages'
import { CardsTable } from 'features/cards/table/CardsTable'
import { InputSearch } from 'features/packs/filters/inputSearch/InputSearch'
import { setCurrentPacksPageAC, setPagePacksCountAC } from 'features/packs/packs-reducer'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.auth.profile._id)
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const userPackId = useAppSelector(state => state.cards.packUserId)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const cards = useAppSelector(state => state.cards)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)

  console.log(cards)

  const addNewCard = () => {
    dispatch(createNewCardTC({ cardsPack_id }))
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
          <h1>{packName}</h1>
          <Button onClick={addNewCard}>Add New Card</Button>
        </div>
      )
    }
    if (myId !== userId) {
      return (
        <div className={s.titleAndBtn}>
          <h1>{packName}</h1>
          <Button onClick={addNewCard}>Add New Card</Button>
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
          <InputSearch placeholder={'Provide your text'} />
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
