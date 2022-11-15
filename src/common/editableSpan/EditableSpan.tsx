import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'

import s from './EditableSpan.module.css'

type EditAbleSpanPropsType = {
  value: string
  updateTitle: (newTitle: string) => void
  disabled: boolean
}

export const EditableSpan: React.FC<EditAbleSpanPropsType> = ({ value, updateTitle, disabled }) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(value)
  const [error, setError] = useState<boolean | string>(false)

  const onEditMode = () => {
    !disabled && setEditMode(true)
  }
  const offEditMode = () => {
    if (title === value) {
      setEditMode(false)

      return
    }
    const itemTitle = title.trim()

    if (itemTitle && itemTitle.length < 25) {
      updateTitle(title)
      setEditMode(false)
    }
    if (!itemTitle) {
      setError('The field is required')
    }
    if (itemTitle.length > 25) {
      setError('Length no more than 25 characters')
    }
  }

  const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    const itemTitle = e.currentTarget.value.trim()

    if (error && itemTitle) setError(false)
    if (!itemTitle) setError('The field is required')
    if (itemTitle.length >= 25) setError('Length no more than 25 characters')
  }
  const onKeyDownChangeText = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' && offEditMode()
  }

  return (
    <span className={s.editableSpan}>
      {editMode ? (
        <span className={s.editMode}>
          <input
            className={error ? s.errorInp : ''}
            value={title}
            autoFocus
            onBlur={offEditMode}
            onChange={onChangeSetTitle}
            onKeyDown={onKeyDownChangeText}
          />
          {editMode && error && <span className={s.formError}>{error}</span>}
          <IconButton
            className={s.changeTextIcon}
            onClick={offEditMode}
            disabled={title ? disabled : true}
            sx={{ color: '#333', padding: '0px' }}
            size={'small'}
          >
            <CheckIcon className={!title ? s.disabledIcon : ''} />
          </IconButton>
        </span>
      ) : (
        <span onClick={onEditMode} className={s.textMode}>
          {value}
          <EditIcon className={s.editTextIcon} sx={{ fontSize: 15, color: '#777' }} />
        </span>
      )}
    </span>
  )
}
