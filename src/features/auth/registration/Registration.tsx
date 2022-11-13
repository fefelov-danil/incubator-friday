import React from 'react'

import { useFormik } from 'formik'
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

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      dispatch(registerMeTC(values))
      formik.resetForm()
    },
  })

  if (isRegistered) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={'formPage'}>
      <div className={'formContainer'}>
        <h1>Registration</h1>
        <form onSubmit={formik.handleSubmit}>
          <InputText className={s.inpEmail} {...formik.getFieldProps('email')} />
          <InputPassword className={s.inpPass} {...formik.getFieldProps('password')} />
          <Button type={'submit'} className={s.btn}>
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}
