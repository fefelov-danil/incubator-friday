import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from 'react'

import SearchIcon from '@mui/icons-material/Search'

import s from './InputSearch.module.css'

// Пропсы стандартного инпута
type DefaultInputTextPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputTextPropsType = DefaultInputTextPropsType & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string
}

export const InputSearch: React.FC<InputTextPropsType> = ({
  type,
  onChange,
  onChangeText,
  onKeyDown,
  onEnter,
  error,
  className,
  spanClassName,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
    onChangeText && onChangeText(e.currentTarget.value)
  }

  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown && onKeyDown(e)
    onEnter && e.key === 'Enter' && onEnter()
  }

  return (
    <p className={s.inputContainer}>
      <SearchIcon sx={{ color: '#555', fontSize: 20 }} />
      <input
        type={'text'}
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        className={`${className} ${s.inputSearch}`}
        {...restProps}
      />
    </p>
  )
}
