import React, { useEffect, useState } from 'react'

import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import {
  addPackTC,
  getPacksTC,
  setCurrentPacksPageAC,
  setFilterToPacksFromInputSearchAC,
  setPagePacksCountAC,
  setRerenderAC,
  setSortMinMaxCardsAC,
  setSortPacksValueAC,
} from './packs-reducer'

import { Button } from 'common/button/Button'
import { Paginator } from 'common/paginator/Paginator'
import { Filters } from 'features/packs/filters/Filters'
import s from 'features/packs/Packs.module.css'
import { PacksTable } from 'features/packs/table/PacksTable'

export const Packs = () => {
  const dispatch = useAppDispatch()
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
  const filterSearchValue = useAppSelector(state => state.packs.filterSearchValue)
  const sortPacksValue = useAppSelector(state => state.packs.sortPacksValue)
  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)
  const rerender = useAppSelector(state => state.packs.rerender)

  //const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const addPack = () => {
    dispatch(addPackTC({ cardsPack: { name: 'PAAACK!!!' } }))
  }

  const setCurrentPage = (newCurrentPage: number) => {
    dispatch(setCurrentPacksPageAC(newCurrentPage))
  }

  const setPageItemsCount = (count: number) => {
    dispatch(setPagePacksCountAC(count))
  }

  useEffect(() => {
    dispatch(setCurrentPacksPageAC(Number(searchParams.get('page'))))
    dispatch(
      setPagePacksCountAC(
        Number(searchParams.get('pageCount')) ? Number(searchParams.get('pageCount')) : 5
      )
    )
    //dispatch(setFilterToPacksFromInputSearchAC(searchParams.get('filterSearchValue') + ''))
    dispatch(setSortPacksValueAC(searchParams.get('sortPacksValue') + ''))
    //dispatch(setSortMinMaxCardsAC(Number(searchParams.get('min')), Number(searchParams.get('max'))))
  }, [])

  useEffect(() => {
    console.log(
      Number(searchParams.get('page')),
      Number(searchParams.get('pageCount')),
      searchParams.get('filterSearchValue') + '',
      searchParams.get('sortPacksValue') + '',
      Number(searchParams.get('min')),
      Number(searchParams.get('max'))
    )

    if (!rerender) {
      dispatch(setRerenderAC(true))

      return
    }

    setSearchParams({
      page: `${page}`,
      pageCount: `${pageCount}`,
      filterSearchValue: `${filterSearchValue}`,
      sortPacksValue: `${sortPacksValue}`,
      min: `${min}`,
      max: `${max}`,
    })

    dispatch(getPacksTC())

    if (cardPacks !== null) {
      dispatch(setRerenderAC(false))
    }
  }, [page, pageCount, filterSearchValue, sortPacksValue, min, max])

  return (
    <div className={'container container-with-table'}>
      <div className={s.pacs}>
        <div className={s.titleAndBtn}>
          <h1>Packs list</h1>
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
