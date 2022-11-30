import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import s from 'common/inputRadio/InputRadio.module.css'

// Пропсы стандартного инпута
type DefaultInputRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputPasswordPropsType = DefaultInputRadioPropsType & {
  onChangeRadio?: (value: string) => void
  spanClassName?: string
}

export const InputRadio: React.FC<InputPasswordPropsType> = ({
  type,
  onChange,
  onKeyDown,
  className,
  spanClassName,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
  }

  return <input type="radio" onChange={onChangeCallback} className={s.inputRadio} {...restProps} />
}
