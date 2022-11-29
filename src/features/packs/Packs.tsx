import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import { addPackTC, getPacksTC, setCurrentPacksPageAC, setPagePacksCountAC } from './packs-reducer'

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
  const min = useAppSelector(state => state.packs.minForAll)
  const max = useAppSelector(state => state.packs.maxForAll)
  const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)

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
    dispatch(getPacksTC())
  }, [])

  useEffect(() => {
    setSearchParams({
      page: `${page}`,
      pageCount: `${pageCount}`,
      filterSearchValue: `${filterSearchValue}`,
      sortPacksValue: `${sortPacksValue}`,
      min: `${min}`,
      max: `${max}`,
    })
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
