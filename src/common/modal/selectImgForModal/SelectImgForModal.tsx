import React, { FC } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import { grey } from '@mui/material/colors'

import s from './SelectImgForModal.module.css'

import defaultCover from 'assets/images/default-pack-cover.png'
import { SelectImage } from 'common/selectImage/SelectImage'

type SelectImgForModalPropsType = {
  title: string
  cover: string | undefined
  setCoverImg: (cover: string | undefined) => void
  className?: string
}

export const SelectImgForModal: FC<SelectImgForModalPropsType> = ({
  title,
  cover,
  setCoverImg,
  className,
}) => {
  const deleteCoverImd = () => {
    setCoverImg(undefined)
  }

  return (
    <div className={className ? `${className} ${s.selectCover}` : s.selectCover}>
      <p>{title}</p>
      <div className={s.image}>
        <SelectImage setCoverImg={setCoverImg} />
        <IconButton
          className={cover ? s.deleteImg : `${s.deleteImg} ${s.displayNone}`}
          style={{ backgroundColor: 'grey' }}
          onClick={deleteCoverImd}
        >
          <CloseIcon sx={{ color: grey[50], fontSize: 22 }} />
        </IconButton>
        {cover ? <img src={cover} alt="pack cover" /> : <img src={defaultCover} alt="pack cover" />}
      </div>
    </div>
  )
}
