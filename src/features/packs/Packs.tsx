import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import {
  getPacksTC,
  setCurrentPacksPageAC,
  setFilterToPacksFromInputSearchAC,
  setPagePacksCountAC,
  setRerenderAC,
  setSortByAllMyAC,
  setSortMinMaxCardsAC,
  setSortPacksValueAC,
} from './packs-reducer'

import { Paginator } from 'common/paginator/Paginator'
import { Filters } from 'features/packs/filters/Filters'
import { AddNewPackModal } from 'features/packs/modals/AddNewPackModal'
import s from 'features/packs/Packs.module.css'
import { PacksTable } from 'features/packs/table/PacksTable'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const filterSearchValue = useAppSelector(state => state.packs.filterSearchValue)
  const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)
  const sortPacksValue = useAppSelector(state => state.packs.sortPacksValue)
  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)
  const rerender = useAppSelector(state => state.packs.rerender)

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const fromUrlPage = searchParams.get('page')
    const fromUrlPageCount = searchParams.get('pageCount')
    const fromUrlFilterSearchValue = searchParams.get('filterSearchValue')
    const fromUrlSortByAllMy = searchParams.get('sortByAllMy')
    const fromUrlSortPacksValue = searchParams.get('sortPacksValue')
    const fromUrlMin = searchParams.get('min')
    const fromUrlMax = searchParams.get('max')

    if (fromUrlPage !== null) {
      dispatch(setCurrentPacksPageAC(Number(fromUrlPage)))
    }
    if (fromUrlPageCount !== null) {
      dispatch(setPagePacksCountAC(Number(fromUrlPageCount)))
    }
    if (fromUrlFilterSearchValue !== null) {
      dispatch(setFilterToPacksFromInputSearchAC(fromUrlFilterSearchValue))
    }
    if (fromUrlSortByAllMy === 'all' || fromUrlSortByAllMy === 'my') {
      dispatch(setSortByAllMyAC(fromUrlSortByAllMy))
    }
    if (fromUrlSortPacksValue !== null) {
      dispatch(setSortPacksValueAC(fromUrlSortPacksValue))
    }
    if (fromUrlMin !== null || fromUrlMax !== null) {
      dispatch(
        setSortMinMaxCardsAC(Number(searchParams.get('min')), Number(searchParams.get('max')))
      )
    }
  }, [])

  const setCurrentPage = (newCurrentPage: number) => {
    dispatch(setCurrentPacksPageAC(newCurrentPage))
  }

  const setPageItemsCount = (count: number) => {
    dispatch(setPagePacksCountAC(count))
  }

  useEffect(() => {
    setSearchParams({
      page: `${page}`,
      pageCount: `${pageCount}`,
      filterSearchValue: `${filterSearchValue}`,
      sortByAllMy: `${sortByAllMy}`,
      sortPacksValue: `${sortPacksValue}`,
      min: `${min}`,
      max: `${max}`,
    })

    if (!rerender) {
      dispatch(setRerenderAC(true))

      return
    }

    dispatch(getPacksTC())

    if (cardPacks === null) {
      dispatch(setRerenderAC(false))
    }
  }, [page, pageCount, filterSearchValue, sortPacksValue, min, max])

  return (
    <div className={'container container-with-table'}>
      <div className={s.pacs}>
        <div className={s.titleAndBtn}>
          <h1>Packs list</h1>
          <AddNewPackModal />
        </div>
        <Filters />
        <PacksTable />
        <Paginator
          name={'PACKS'}
          currentPage={page}
          onPageChange={setCurrentPage}
          onPageItemsCountChange={setPageItemsCount}
          pageSize={pageCount}
          portionSize={5}
          totalItemsCount={cardPacksTotalCount}
        />
      </div>
    </div>
  )
}
