import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { getCardsTC } from '../cards/cards-reduser'

import { addPackTC, deletePackTC, getPacksTC, updatePackTC } from './packs-reducer'

import { Button } from 'common/button/Button'
import { Filters } from 'features/packs/filters/Filters'
import s from 'features/packs/Packs.module.css'

export const Packs = () => {
  const page = useAppSelector(state => state.packs.page)
  const pageCount = useAppSelector(state => state.packs.pageCount)
  const dispatch = useAppDispatch()

  const getCards = () => {
    console.log('add pack')
    dispatch(getCardsTC({ cardsPack_id: '637c9e6506178c0004b1e227' }))
  }

  const addPack = () => {
    console.log('add pack')
    dispatch(addPackTC({ cardsPack: { name: 'PAAACK!!!' } }))
  }

  const deletePack = () => {
    console.log('delete pack')
    dispatch(deletePackTC('637b71c1a83e5500043db562')) //  _id колоды
  }

  const updatePack = () => {
    console.log('update pack')
    dispatch(updatePackTC({ _id: '637b71c1a83e5500043db562', name: 'new SUREP name' })) //  _id колоды
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
          <Button onClick={deletePack}>deletePack</Button>
          <Button onClick={updatePack}>updatePack</Button>
          <Button onClick={addPack}>Add new pack</Button>
          <Button onClick={getCards}>getCards</Button>
        </div>
        <Filters />
      </div>
    </div>
  )
}
