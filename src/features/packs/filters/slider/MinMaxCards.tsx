import React, { ChangeEvent, useEffect, useState } from 'react'

import Slider from '@mui/material/Slider/Slider'
import { useSearchParams } from 'react-router-dom'

import s from './MinMaxCards.module.css'

import { setSortMinMaxCardsAC } from 'features/packs/packs-reducer'
import { useAppDispatch, useAppSelector, useDebounce } from 'utils/hooks'

export const MinMaxCards = () => {
  const dispatch = useAppDispatch()
  const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
  const appStatus = useAppSelector(state => state.app.appStatus)
  const min = useAppSelector(state => state.packs.min)
  const max = useAppSelector(state => state.packs.max)

  const [searchParams, setSearchParams] = useSearchParams()

  const [value, setValue] = useState<number[]>([min, max])
  const debouncedValue = useDebounce<number[]>(value, 500)
  const minDistance = 1

  useEffect(() => {
    setValue([min, max])
  }, [min, max])

  useEffect(() => {
    setValue([Number(searchParams.get('min')), Number(searchParams.get('max'))])
  }, [maxCardsCount])

  useEffect(() => {
    dispatch(setSortMinMaxCardsAC(debouncedValue[0], debouncedValue[1]))
  }, [debouncedValue])

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
    }
  }

  const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = +e.currentTarget.value

    if (currentValue < value[1] && currentValue >= 0) {
      setValue([+e.currentTarget.value, value[1]])
    }
  }

  const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = +e.currentTarget.value

    if (currentValue > value[0] && currentValue <= maxCardsCount) {
      setValue([value[0], +e.currentTarget.value])
    }
  }

  return (
    <div className={s.slider}>
      <input
        disabled={appStatus === 'loading'}
        type={'number'}
        className={s.minMax}
        value={value[0]}
        onChange={onChangeMin}
      />
      <Slider
        disabled={appStatus === 'loading'}
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        disableSwap
        min={0}
        max={maxCardsCount}
      />
      <input
        disabled={appStatus === 'loading'}
        type={'number'}
        className={s.minMax}
        value={value[1]}
        onChange={onChangeMax}
      />
    </div>
  )
}
