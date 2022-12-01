import React, { useState } from 'react'

import { useAppSelector } from '../../utils/hooks'

import s from './Paginator.module.css'

type PaginatorPropsType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  portionSize: number
  onPageChange: (p: number) => void
  onPageItemsCountChange: (count: number) => void
  name: string
}

export const Paginator = ({
  totalItemsCount,
  pageSize,
  currentPage,
  portionSize,
  onPageChange,
  name,
  onPageItemsCountChange,
}: PaginatorPropsType) => {
  const value = useAppSelector(state => state.packs.pageCount)
  const appStatus = useAppSelector(state => state.app.appStatus)

  let pageCount = Math.ceil(totalItemsCount / pageSize)
  let pages = []

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i)
  }

  let portionCount = Math.ceil(pageCount / portionSize)
  let [portionNumber, setPortionNumber] = useState(1)
  let leftPortionLimit = (portionNumber - 1) * portionSize + 1
  let rightPortionLimit = portionNumber * portionSize

  return (
    <div className={s.paginator}>
      {portionNumber > 1 && (
        <button
          disabled={appStatus === 'loading'}
          className={s.button}
          onClick={() => {
            setPortionNumber(portionNumber - 1)
          }}
        >
          {`<`}
        </button>
      )}

      {pages
        .filter(p => p >= leftPortionLimit && p <= rightPortionLimit)
        .map(p => {
          return (
            <button
              key={p}
              disabled={appStatus === 'loading'}
              className={`${currentPage === p && s.selectedPage} ${s.pageNumber}`}
              onClick={() => {
                onPageChange(p)
              }}
            >
              {p}
            </button>
          )
        })}

      {portionCount > portionNumber && (
        <button
          disabled={appStatus === 'loading'}
          className={s.button}
          onClick={() => {
            setPortionNumber(portionNumber + 1)
          }}
        >
          {`>`}
        </button>
      )}
      <div className={s.changeItemsPerPageBlock}>
        <span>SHOW</span>
        <select
          disabled={appStatus === 'loading'}
          value={value}
          onChange={e => {
            onPageItemsCountChange(+e.currentTarget.value)
          }}
          id="select"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <span>{name} PER PAGE</span>
      </div>
    </div>
  )
}
