import React from 'react'

import { Navigate } from 'react-router-dom'

import { Button } from '../../../common/button/Button'
import { InputPassword } from '../../../common/inputPassword/InputPassword'
import { InputText } from '../../../common/inputText/InputText'
import { PATH } from '../../../common/pages/Pages'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { registerMeTC } from '../auth-reducer'

import s from './Registration.module.css'

export const Registration = () => {
  const dispatch = useAppDispatch()
  const isRegistered = useAppSelector<boolean>(state => state.auth.isRegistered)

  if (isRegistered) {
    return <Navigate replace to={PATH.LOGIN} />
  }

  return (
    <div className={'formPage'}>
      <div className={'formContainer'}>
        <h1>Registration</h1>
        <InputText className={s.inpEmail} />
        <InputPassword className={s.inpPass} />
        <Button
          onClick={() => {
            console.log('registerMe')
            dispatch(
              registerMeTC({
                email: 'sxplddin@gmail.com',
                password: 'stringstring',
              })
            )
          }}
          className={s.btn}
        >
          Кнопка
        </Button>
      </div>
    </div>
  )
}
