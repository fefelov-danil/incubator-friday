import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react'

import SearchIcon from '@mui/icons-material/Search'

import s from './InputSearch.module.css'

import { getPacksTC } from 'features/packs/packs-reducer'
import { useAppDispatch, useDebounce } from 'utils/hooks'

// Пропсы стандартного инпута
type DefaultInputTextPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const InputSearch: React.FC<DefaultInputTextPropsType> = ({ ...restProps }) => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<string | null>(null)
  const debouncedValue = useDebounce<string | null>(value, 700)

  useEffect(() => {
    if (debouncedValue !== null) {
      dispatch(getPacksTC())
    }
  }, [debouncedValue])

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <p className={s.inputContainer}>
      <SearchIcon sx={{ color: '#555', fontSize: 20 }} />
      <input type={'text'} onChange={onChangeCallback} className={s.inputSearch} {...restProps} />
    </p>
  )
}
