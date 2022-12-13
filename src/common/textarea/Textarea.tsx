import React, { ChangeEvent, DetailedHTMLProps, KeyboardEvent, TextareaHTMLAttributes } from 'react'

import s from './Textarea.module.css'

type DefaultTextareaPropsType = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

type TextareaPropsType = DefaultTextareaPropsType & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string
}

export const Textarea: React.FC<TextareaPropsType> = ({
  onChange,
  onChangeText,
  onKeyDown,
  onEnter,
  error,
  className,
  spanClassName,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e)
    onChangeText && onChangeText(e.currentTarget.value)
  }

  const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown && onKeyDown(e)
    onEnter && e.key === 'Enter' && onEnter()
  }

  const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
  const finalTextareaClassName = `${s.textarea} ${error && s.errorTextarea} ${className}` // need to fix with (?:) and s.superInput

  return (
    <>
      <textarea
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        className={finalTextareaClassName}
        {...restProps}
      ></textarea>
      {error && <span className={finalSpanClassName}>{error}</span>}
    </>
  )
}
