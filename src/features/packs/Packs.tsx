import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import {
  addPackTC,
  getPacksTC,
  setCurrentPacksPageAC,
  setFilterToPacksFromInputSearchAC,
  setPagePacksCountAC,
  setSortByAllMyAC,
  setSortMinMaxCardsForAllAC,
  setSortMinMaxCardsForMyAC,
  setSortPacksValueAC,
} from './packs-reducer'

import { Button } from 'common/button/Button'
import { Paginator } from 'common/paginator/Paginator'
import { Filters } from 'features/packs/filters/Filters'
import s from 'features/packs/Packs.module.css'
import { PacksTable } from 'features/packs/table/PacksTable'

export const Packs = () => {
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const filterSearchValue = useAppSelector(state => state.packs.filterSearchValue)
  const sortPacksValue = useAppSelector(state => state.packs.sortPacksValue)
  const minAll = useAppSelector(state => state.packs.minForAll)
  const maxAll = useAppSelector(state => state.packs.maxForAll)
  const minMy = useAppSelector(state => state.packs.minForMy)
  const maxMy = useAppSelector(state => state.packs.maxForMy)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)

  const dispatch = useAppDispatch()

  const [searchParams, setSearchParams] = useSearchParams({})

  const addPack = () => {
    dispatch(addPackTC({ cardsPack: { name: 'PAAACK!!!' } }))
  }

  const setCurrentPage = (newCurrentPage: number) => {
    dispatch(setCurrentPacksPageAC(newCurrentPage))
    dispatch(getPacksTC())
  }

  const setPageItemsCount = (count: number) => {
    dispatch(setPagePacksCountAC(count))
    dispatch(getPacksTC())
  }

  useEffect(() => {
    dispatch(setCurrentPacksPageAC(Number(searchParams.get('page'))))

    dispatch(
      setPagePacksCountAC(
        Number(searchParams.get('pageCount')) ? Number(searchParams.get('pageCount')) : 5
      )
    )

    dispatch(setFilterToPacksFromInputSearchAC(searchParams.get('filterSearchValue') || ''))

    dispatch(setSortPacksValueAC(searchParams.get('sortPacksValue') || ''))

    dispatch(setSortByAllMyAC(searchParams.get('whose') || 'all'))

    searchParams.get('whose') === 'all' &&
      dispatch(
        setSortMinMaxCardsForAllAC(Number(searchParams.get('min')), Number(searchParams.get('max')))
      )

    searchParams.get('whose') === 'my' &&
      dispatch(
        setSortMinMaxCardsForMyAC(Number(searchParams.get('min')), Number(searchParams.get('max')))
      )

    dispatch(getPacksTC())
  }, [])

  useEffect(() => {
    setSearchParams({
      page: `${page}`,
      pageCount: `${pageCount}`,
      filterSearchValue: `${filterSearchValue}`,
      sortPacksValue: `${sortPacksValue}`,
      min: `${sortByAllMy === 'all' ? minAll : minMy}`,
      max: `${sortByAllMy === 'all' ? maxAll : maxMy}`,
      whose: `${sortByAllMy}`,
    })
  }, [
    page,
    pageCount,
    filterSearchValue,
    sortPacksValue,
    minAll,
    minMy,
    maxAll,
    maxMy,
    sortByAllMy,
  ])

  return (
    <div className={'container container-with-table'}>
      <div className={s.pacs}>
        <div className={s.titleAndBtn}>
          <h1>Packs list </h1>
          <Button onClick={addPack}>Add new pack</Button>
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
