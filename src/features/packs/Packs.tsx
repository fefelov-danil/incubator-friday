import React, { ChangeEvent, useEffect, useState } from 'react'

import { Input } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import { Checkbox } from '../../common/checkbox/Checkbox'
import { Modal } from '../../common/modal/Modal'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import {
  addPackTC,
  getPacksTC,
  setCurrentPacksPageAC,
  setFilterToPacksFromInputSearchAC,
  setPagePacksCountAC,
  setRerenderAC,
  setSortByAllMyAC,
  setSortMinMaxCardsAC,
  setSortPacksValueAC,
} from './packs-reducer'

import { Button } from 'common/button/Button'
import { Paginator } from 'common/paginator/Paginator'
import { Filters } from 'features/packs/filters/Filters'
import s from 'features/packs/Packs.module.css'
import { PacksTable } from 'features/packs/table/PacksTable'

export const Packs = () => {
  const [openModal, setOpenModal] = useState<boolean | null>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)

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

  const addPack = () => {
    dispatch(addPackTC({ cardsPack: { name: inputValue, private: isChecked } }))
    setInputValue('')
    setIsChecked(false)
    setOpenModal(false)
  }

  const setCurrentPage = (newCurrentPage: number) => {
    dispatch(setCurrentPacksPageAC(newCurrentPage))
  }

  const setPageItemsCount = (count: number) => {
    dispatch(setPagePacksCountAC(count))
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onCheckBoxChangeHandler = (e: boolean) => {
    setIsChecked(e)
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
          <Modal
            title={'Add new pack'}
            childrenOpenModal={<Button onClick={() => setOpenModal(true)}>Add new pack</Button>}
            openFromProps={openModal}
          >
            <div className={s.createPackModal}>
              <div className={s.inputBlock}>
                <Input onChange={onChangeHandler} value={inputValue} />
                <Checkbox
                  checked={isChecked}
                  onChangeChecked={onCheckBoxChangeHandler}
                  className={s.checkbox}
                >
                  Private pack
                </Checkbox>
              </div>
              <div className={s.modalButtonBlock}>
                <Button className={s.close} onClick={() => setOpenModal(false)}>
                  No, cancel
                </Button>
                <Button className={s.createPack} onClick={addPack}>
                  Add pack
                </Button>
              </div>
            </div>
          </Modal>
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
