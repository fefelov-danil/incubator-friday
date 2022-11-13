import React from 'react'

import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { Checkbox } from '../../../common/checkbox/Checkbox'
import { InputPassword } from '../../../common/inputPassword/InputPassword'
import { InputText } from '../../../common/inputText/InputText'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { loginTC } from '../auth-reducer'

import s from './Login.module.css'

import { Button } from 'common/button/Button'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const dispatch = useAppDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 8) {
        errors.password = 'Must be min 8 characters'
      }

      return errors
    },

    onSubmit: values => {
      dispatch(loginTC(values))
      formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <div className={'formPage'}>
      <form className={'formContainer'} onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <InputText className={s.inpEmail} {...formik.getFieldProps('email')} />
        {formik.touched.email && formik.errors.email && (
          <div className={s.error}>{formik.errors.email}</div>
        )}
        <InputPassword className={s.inpPass} {...formik.getFieldProps('password')} />
        {formik.touched.password && formik.errors.password && (
          <div className={s.error}>{formik.errors.password}</div>
        )}
        <Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')}>
          Remember Me
        </Checkbox>
        <Button type={'submit'} className={s.btn}>
          Sign in
        </Button>
      </form>
    </div>
  )
}
