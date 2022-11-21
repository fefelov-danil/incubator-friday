import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import { addPackTC, getPacksTC } from './packs-reducer'

import { Button } from 'common/button/Button'
import { Filters } from 'features/packs/filters/Filters'
import s from 'features/packs/Packs.module.css'

export const Packs = () => {
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const dispatch = useAppDispatch()

  const addPack = () => {
    console.log('add pack')
    dispatch(addPackTC({ cardsPack: { name: 'PAAACK!!!' } }))
  }

  useEffect(() => {
    dispatch(
      getPacksTC({
        page,
        pageCount,
      })
    )
  }, [])

  return (
    <div className={'container container-with-table'}>
      <div className={s.pacs}>
        <div className={s.titleAndBtn}>
          <h1>Packs list</h1>
          <Button onClick={addPack}>Add new pack</Button>
        </div>
        <Filters />
      </div>
    </div>
  )
}
