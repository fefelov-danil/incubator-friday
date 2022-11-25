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

  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)

  let filterSearchValue = whose === 'packs' ? filterSearchValuePacks : filterSearchValueCards

  const [value, setValue] = useState<string>(filterSearchValue)
  const debouncedValue = useDebounce<string>(value, 700)

  useEffect(() => {
    if (debouncedValue !== filterSearchValue) {
      if (whose === 'packs') {
        dispatch(setFilterToPacksFromInputSearchAC(debouncedValue))
        dispatch(getPacksTC())
      } else {
        dispatch(setFilterToCardsFromInputSearchAC(debouncedValue))
        dispatch(
          getCardsTC({
            cardsPack_id,
            page,
            pageCount,
            cardQuestion: debouncedValue,
          })
        )
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
    </p>
  )
}
