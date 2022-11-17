import React, { useEffect } from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { AppStatusType } from '../../../app/app-reducer'
import { Checkbox } from '../../../common/checkbox/Checkbox'
import { InputPassword } from '../../../common/inputPassword/InputPassword'
import { InputText } from '../../../common/inputText/InputText'
import { PATH } from '../../../common/pages/Pages'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { loginTC, setRegistrationAC } from '../auth-reducer'

import s from './Login.module.css'

import { Button } from 'common/button/Button'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
  const appStatus = useAppSelector<AppStatusType>(state => state.app.appStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setRegistrationAC(false))
  })

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
      // formik.resetForm()
    },
  })

  if (isLoggedIn) {
    return <Navigate to={PATH.PROFILE} />
  }

  return (
    <div className={'formPage'}>
      <form className={'formContainer'} onSubmit={formik.handleSubmit}>
        <h1>Login</h1>
        <div className={s.inputContainer}>
          <InputText
            placeholder="Email"
            className={s.inpEmail}
            {...formik.getFieldProps('email')}
          />
          {formik.touched.email && formik.errors.email && (
            <span className={s.formError}>{formik.errors.email}</span>
          )}
        </div>
        <div className={s.inputContainer}>
          <InputPassword
            placeholder="Password"
            className={s.inpPass}
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <span className={s.formError}>{formik.errors.password}</span>
          )}
        </div>
        <div className={s.checkBox}>
          <Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')}>
            Remember Me
          </Checkbox>
          <div>
            <NavLink className={s.passwordReset} to={PATH.PASSWORD_RECOVERY}>
              Forgot your password?
            </NavLink>
          </div>
        </div>
        <Button disabled={appStatus === 'loading'} type={'submit'} className={s.btn}>
          Sign in
        </Button>
        <div className={s.forgotPassword}>
          <div>{`Still don't have an account?`}</div>
          <NavLink className={s.signUp} to={PATH.REGISTRATION}>
            Sign Up
          </NavLink>
        </div>
      </form>
    </div>
  )
}
