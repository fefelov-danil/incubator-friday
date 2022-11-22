import React from 'react'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'

import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import { createNewCardTC, getCardsTC } from './cards-reduser'
import s from './Cards.module.css'

import { Button } from 'common/button/Button'
import { Paginator } from 'common/paginator/Paginator'
import { CardsTable } from 'features/cards/table/CardsTable'
import { InputSearch } from 'features/packs/filters/inputSearch/InputSearch'
import { setCurrentPacksPageAC, setPagePacksCountAC } from 'features/packs/packs-reducer'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)

  const addNewCard = () => {
    dispatch(createNewCardTC({ cardsPack_id }))
  }

  const changeSearchText = (value: string) => {
    console.log(value)
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
          <button>
            <NavigateBeforeIcon sx={{ fontSize: 26 }} />
            Back to Packs List
          </button>
        </p>
        <div className={s.titleAndBtn}>
          <h1>Packs list</h1>
          <Button onClick={addNewCard}>addNewCard</Button>
        </div>
        <div className={s.search}>
          <p className={s.filterName}>Search</p>
          <InputSearch placeholder={'Provide your text'} onChangeText={changeSearchText} />
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
