import React from 'react'

import s from './Filters.module.css'

import { AllOrMyCards } from 'features/packs/filters/allOrMyCards/AllOrMyCards'
import { FiltersOff } from 'features/packs/filters/filtersOff/FiltersOff'
import { InputSearch } from 'features/packs/filters/inputSearch/InputSearch'
import { MinMaxCards } from 'features/packs/filters/slider/MinMaxCards'

export const Filters = () => {
  const changeSearchText = (value: string) => {
    console.log(value)
  }

  const changeSlider = (currentMinMax: number[]) => {
    console.log(currentMinMax)
  }

  const changeAllOrMyPacks = (my: boolean) => {
    console.log(my)
  }

  const turnOffFilters = () => {
    console.log('filters off')
  }

  return (
    <div className={s.filters}>
      <div className={s.search}>
        <p className={s.filterName}>Search</p>
        <InputSearch placeholder={'Provide your text'} onChangeText={changeSearchText} />
      </div>
      <div className={s.allOrMyPacks}>
        <p className={s.filterName}>Show packs cards</p>
        <AllOrMyCards myPacks={false} changeAllOrMyPacks={changeAllOrMyPacks} />
      </div>
      <div className={s.slider}>
        <p className={s.filterName}>Number of cards</p>
        <MinMaxCards initialMinMax={[0, 50]} changeSlider={changeSlider} />
      </div>
      <div className={s.filtersOff}>
        <FiltersOff turnOffFilters={turnOffFilters} />
      </div>
    </div>
  )
}
