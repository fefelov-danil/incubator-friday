import React, { useState } from 'react'

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

  return (
    <div className={s.slider}>
      <span className={s.minMax}>{value[0]}</span>
      <Slider
        getAriaLabel={() => 'Minimum distance'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        disableSwap
        min={initialMinMax[0]}
        max={initialMinMax[1]}
      />
      <span className={s.minMax}>{value[1]}</span>
    </div>
  )
}
