import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import { useAppSelector } from '../../utils/hooks'

import s from 'common/button/Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type ButtonPropsType = DefaultButtonPropsType & {
  className?: string
}

export const Button: React.FC<ButtonPropsType> = ({ className, ...restProps }) => {
  const appStatus = useAppSelector(state => state.app.appStatus)

  const finalClassName = `${s.button} ${className}`

  return <button disabled={appStatus === 'loading'} className={finalClassName} {...restProps} />
}
