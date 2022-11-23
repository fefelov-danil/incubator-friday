import React, { ChangeEvent, useState } from 'react'

import Slider from '@mui/material/Slider/Slider'

import s from './MinMaxCards.module.css'

type MinMaxCardsPropsType = {
  initialMinMax: number[]
  changeSlider: (currentMinMax: number[]) => void
}

export const MinMaxCards: React.FC<MinMaxCardsPropsType> = ({ initialMinMax, changeSlider }) => {
  const minDistance = 1
  const [value, setValue] = useState<number[]>([initialMinMax[0], initialMinMax[1]])

  const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
    }

    changeSlider([newValue[0], newValue[1]])
  }

  const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = +e.currentTarget.value

    if (currentValue < value[1] && currentValue >= initialMinMax[0]) {
      setValue([+e.currentTarget.value, value[1]])
    }
  }

  const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = +e.currentTarget.value

    if (currentValue > value[0] && currentValue <= initialMinMax[1]) {
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
        min={initialMinMax[0]}
        max={initialMinMax[1]}
      />
      <input type={'number'} className={s.minMax} value={value[1]} onChange={onChangeMax} />
    </div>
  )
}
