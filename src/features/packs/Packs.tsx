import React from 'react'

import { Button } from 'common/button/Button'
import { Filters } from 'features/packs/filters/Filters'
import s from 'features/packs/Packs.module.css'

export const Packs = () => {
  const addPack = () => {
    console.log('add pack')
  }

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
