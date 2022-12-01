import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import s from 'common/inputRadio/InputRadio.module.css'

// Пропсы стандартного инпута
type DefaultInputRadioPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

type InputPasswordPropsType = DefaultInputRadioPropsType & {
  value: string
  onChangeRadio?: (value: string) => void
  spanClassName?: string
}

export const InputRadio: React.FC<InputPasswordPropsType> = ({
  type,
  value,
  name,
  onChange,
  onKeyDown,
  id,
  className,
  spanClassName,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e)
  }

  return (
    <div className={s.inpContainer}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        onChange={onChangeCallback}
        {...restProps}
      />
      <label htmlFor={id}>{value}</label>
      <div className={s.check}>
        <div className={s.inside}></div>
      </div>
    </div>
  )
}
