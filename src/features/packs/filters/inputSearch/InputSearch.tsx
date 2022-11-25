import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react'

import SearchIcon from '@mui/icons-material/Search'

import { getCardsTC, setFilterToCardsFromInputSearchAC } from '../../../cards/cards-reduser'

import s from './InputSearch.module.css'

import { getPacksTC, setFilterToPacksFromInputSearchAC } from 'features/packs/packs-reducer'
import { useAppDispatch, useAppSelector, useDebounce } from 'utils/hooks'

type DefaultInputTextPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputSearchPropsType = DefaultInputTextPropsType & {
  whose: 'packs' | 'cards'
}

export const InputSearch: React.FC<InputSearchPropsType> = ({ whose, ...restProps }) => {
  const dispatch = useAppDispatch()
  const filterSearchValuePacks = useAppSelector(state => state.packs.filterSearchValue)
  const filterSearchValueCards = useAppSelector(state => state.cards.filterSearchValue)
  const contentPacks = useAppSelector(state => state.packs.cardPacks)
  const contentCards = useAppSelector(state => state.cards.cards)

  let filterSearchValue = whose === 'packs' ? filterSearchValuePacks : filterSearchValueCards
  let content = whose === 'packs' ? contentPacks : contentCards
  let contentLength = content ? content.length : 0

  const [value, setValue] = useState<string>(filterSearchValue)
  const debouncedValue = useDebounce<string>(value, 700)

  useEffect(() => {
    if (debouncedValue !== filterSearchValue) {
      if (whose === 'packs') {
        dispatch(setFilterToPacksFromInputSearchAC(debouncedValue))
        dispatch(getPacksTC())
      } else {
        dispatch(setFilterToCardsFromInputSearchAC(debouncedValue))
        dispatch(getCardsTC())
      }
    }
  }, [debouncedValue])

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <p className={s.inputContainer}>
      <SearchIcon sx={{ color: '#555', fontSize: 20 }} />
      <input
        value={value}
        type={'text'}
        onChange={onChangeCallback}
        className={s.inputSearch}
        {...restProps}
      />
      {value.length > 0 && contentLength === 0 && (
        <span
          className={s.error_message}
        >{`"Колоды с введенным название не найдены. Измените параметры запроса" или что то типо этого`}</span>
      )}
    </p>
  )
}
