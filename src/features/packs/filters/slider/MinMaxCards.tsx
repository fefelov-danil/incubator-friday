import React, { ChangeEvent, useEffect, useState } from 'react'

import Slider from '@mui/material/Slider/Slider'

import s from './MinMaxCards.module.css'

import { getPacksTC } from 'features/packs/packs-reducer'
import { useAppDispatch, useAppSelector, useDebounce } from 'utils/hooks'

export const MinMaxCards = () => {
  const dispatch = useAppDispatch()
  const maxCountCards = useAppSelector(state => state.packs.maxCardsCount)

  const [value, setValue] = useState<number[]>([0, maxCountCards])
  const debouncedValue = useDebounce<number[]>(value, 500)
  const minDistance = 1

  useEffect(() => {
    setValue([0, maxCountCards])
  }, [maxCountCards])

  useEffect(() => {
    if (debouncedValue[1]) {
      console.log(debouncedValue[1])
      dispatch(getPacksTC({ min: debouncedValue[0], max: debouncedValue[1] }))
    }
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

    if (currentValue > value[0] && currentValue <= maxCountCards) {
      setValue([value[0], +e.currentTarget.value])
    }
  }

  return (
    <div className={s.slider}>
      <input type={'number'} className={s.minMax} value={value[0]} onChange={onChangeMin} />
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        disableSwap
        min={0}
        max={maxCountCards}
      />
      <input type={'number'} className={s.minMax} value={value[1]} onChange={onChangeMax} />
    </div>
  )
}
