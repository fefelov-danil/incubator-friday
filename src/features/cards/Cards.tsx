import React from 'react'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'

import s from './Cards.module.css'

import { Button } from 'common/button/Button'
import { CardsTable } from 'features/cards/table/CardsTable'
import { InputSearch } from 'features/packs/filters/inputSearch/InputSearch'

export const Cards = () => {
  const learn = () => {
    console.log('Learn to pack')
  }

  const changeSearchText = (value: string) => {
    console.log(value)
  }

  return (
    <div className={'container container-with-table'}>
      <div className={s.cards}>
        <p className={s.backToPacks}>
          <button>
            <NavigateBeforeIcon sx={{ fontSize: 26 }} />
            Back to Packs List
          </button>
        </p>
        <div className={s.titleAndBtn}>
          <h1>Packs list</h1>
          <Button onClick={learn}>Learn to pack</Button>
        </div>
        <div className={s.search}>
          <p className={s.filterName}>Search</p>
          <InputSearch placeholder={'Provide your text'} onChangeText={changeSearchText} />
        </div>
        <CardsTable />
      </div>
    </div>
  )
}
