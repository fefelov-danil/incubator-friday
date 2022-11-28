import React, { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import {
  addPackTC,
  getPacksTC,
  setCurrentPacksPageAC,
  setPagePacksCountAC,
  setRerenderAC,
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
  const sortByAllMy = useAppSelector(state => state.packs.sortByAllMy)
  const filterSearchValue = useAppSelector(state => state.packs.filterSearchValue)
  const sortPacksValue = useAppSelector(state => state.packs.sortPacksValue)
  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)
  const rerender = useAppSelector(state => state.packs.rerender)

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
    rerender ? dispatch(getPacksTC()) : dispatch(setRerenderAC(true))

    if (cardPacks === null) {
      dispatch(setRerenderAC(false))
    }
  }, [page, pageCount, filterSearchValue, sortPacksValue, min, max])

  useEffect(() => {
    if (cardPacks !== null) {
      dispatch(getPacksTC(true))
      dispatch(setRerenderAC(false))
    }
  }, [sortByAllMy])

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
