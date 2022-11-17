import React from 'react'

import { useFormik } from 'formik'
import { Navigate, NavLink } from 'react-router-dom'

import { Button } from '../../../common/button/Button'
import { InputText } from '../../../common/inputText/InputText'
import { PATH } from '../../../common/pages/Pages'
import { useAppDispatch, useAppSelector } from '../../../utils/hooks'
import { resetPasswordTC } from '../auth-reducer'

import s from './PasswordRecovery.module.css'

export const PasswordRecovery = () => {
  const dispatch = useAppDispatch()
  const isPasswordReset = useAppSelector<boolean>(state => state.auth.isPasswordReset)

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(
        resetPasswordTC({
          email: values.email,
          from: 'test-front-admin <ai73a@yandex.by>',
          message: `<div; padding: 40px">password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>click here to change a password</a></div>`,
        })
      )
      formik.resetForm()
    },
  })

  if (isPasswordReset) {
    return <Navigate to={PATH.CHANGE_PASSWORD} />
  }

  return (
    <div className={'formPage'}>
      <div className={'formContainer'}>
        <h1>Forgot password?</h1>
        <form className={s.registration_form} onSubmit={formik.handleSubmit}>
          <div className={s.inpEmail_container}>
            <InputText
              placeholder={'email'}
              className={s.inpEmail}
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <span className={s.error_message}>{formik.errors.email}</span>
            ) : null}
          </div>
          <p className={s.input_description}>
            Enter your email address and we will send you further instructions
          </p>
          <Button type={'submit'} className={s.btn}>
            Send Instructions
          </Button>
        </form>
        <p className={s.input_description}>Did you remember your password?</p>
        <NavLink className={s.login_link} to={PATH.LOGIN}>
          <span>Try to login</span>
        </NavLink>
      </div>
    </div>
  )
}

// Types

type FormikErrorType = {
  email?: string
}
