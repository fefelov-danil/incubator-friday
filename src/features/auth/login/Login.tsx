import React from 'react'

import s from './Login.module.css'

import { Button } from 'common/button/Button'
import { InputPassword } from 'common/inputPassword/InputPassword'
import { InputText } from 'common/inputText/InputText'

export const Login = () => {
  return (
    <div className={'formPage'}>
      <div className={'formContainer'}>
        <h1>Login</h1>
        <InputText className={s.inpEmail} />
        <InputPassword className={s.inpPass} />
        <Button className={s.btn}>Кнопка</Button>
      </div>
    </div>
  )
}
