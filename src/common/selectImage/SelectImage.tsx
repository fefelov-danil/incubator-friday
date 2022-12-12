import React, { ChangeEvent } from 'react'

import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import { IconButton } from '@mui/material'
import { grey } from '@mui/material/colors'

import { convertFileToBase64 } from 'utils/converToBase64'
import { errorUtils } from 'utils/errors-handler'
import { useAppDispatch } from 'utils/hooks'

export type SelectImagePropsType = {
  setCoverImg: (coverImg: undefined | string) => void
}

export const SelectImage: React.FC<SelectImagePropsType> = ({ setCoverImg }) => {
  const dispatch = useAppDispatch()

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 5000000) {
        convertFileToBase64(file, (file64: string) => {
          console.log('third', file64)
          setCoverImg(file64)
        })
      } else {
        errorUtils(new Error('File is too large'), dispatch)
      }
    }
  }

  return (
    <label>
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
      <IconButton style={{ backgroundColor: 'grey' }} component="span">
        <CameraAltOutlinedIcon sx={{ color: grey[50] }} />
      </IconButton>
    </label>
  )
}
