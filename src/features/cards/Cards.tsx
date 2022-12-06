import React, { useEffect, useRef, useState } from 'react'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton/IconButton'
import { Navigate, NavLink, useSearchParams } from 'react-router-dom'

import s from './Cards.module.css'

import { Button } from 'common/button/Button'
import { Paginator } from 'common/paginator/Paginator'
import { PATH } from 'common/routes/Pages'
import {
  getCardsTC,
  setCurrentCardsPageAC,
  setCurrentPackIdAC,
  setPageCardsCountAC,
} from 'features/cards/cards-reducer'
import { CardsTitleAndActions } from 'features/cards/cardsTitleAndActions/CardsTitleAndActions'
import { AddNewCardModal } from 'features/cards/modals/AddNewCardModal'
import { DeleteModal } from 'features/cards/modals/DeleteModal'
import { EditModals } from 'features/cards/modals/EditModals'
import { CardsTable } from 'features/cards/table/CardsTable'
import { setCardsPackIdInLearnAC } from 'features/learn/learn-reducer'
import { InputSearch } from 'features/packs/filters/inputSearch/InputSearch'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const filterSearchValue = useAppSelector(state => state.cards.filterSearchValue)

  const [urlParams, setUrlParams] = useSearchParams()

  useEffect(() => {
    const fromUrlCurrentPackId = urlParams.get('currentPackId')

    if (fromUrlCurrentPackId !== null) {
      dispatch(setCurrentPackIdAC(fromUrlCurrentPackId))
    }
  }, [])

  useEffect(() => {
    dispatch(setCardsPackIdInLearnAC(cardsPack_id))
  }, [cardsPack_id])

  useEffect(() => {
    if (cardsPack_id) {
      setUrlParams({
        currentPackId: `${cardsPack_id}`,
      })
    }

    dispatch(getCardsTC())
  }, [page, pageCount, filterSearchValue])

  const setCurrentPage = (newCurrentPage: number) => {
    dispatch(setCurrentCardsPageAC(newCurrentPage))
  }

  const setPageItemsCount = (count: number) => {
    dispatch(setPageCardsCountAC(count))
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
        <CardsTitleAndActions />
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
