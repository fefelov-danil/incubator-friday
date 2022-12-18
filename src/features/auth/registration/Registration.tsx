import React from 'react'

import { useFormik } from 'formik'
import { Navigate } from 'react-router-dom'

import { registerMeTC } from '../auth-reducer'

import s from './Registration.module.css'

import { Button } from 'common/button/Button'
import { InputPassword } from 'common/inputPassword/InputPassword'
import { InputText } from 'common/inputText/InputText'
import { PATH } from 'common/routes/Pages'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const Registration = () => {
  const dispatch = useAppDispatch()
  const isRegistered = useAppSelector(state => state.auth.isRegistered)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
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
      } else if (values.password.length <= 7) {
        errors.password = 'Password must be more than 7 characters'
      }
      if (!values.repeatPassword) {
        errors.repeatPassword = 'Required'
      } else if (values.repeatPassword !== values.password) {
        errors.repeatPassword = 'Password must be match'
      }

      return errors
    },
    onSubmit: values => {
      dispatch(registerMeTC(values))
    },
  })

  if (isRegistered) {
    return <Navigate to={PATH.LOGIN} />
  }

  return (
    <div className={'formPage'}>
      <div className={'formContainer'}>
        <h1>Registration</h1>
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
          <div className={s.inpPass_container}>
            <InputPassword
              placeholder={'password'}
              className={s.inpPass}
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <span className={s.error_message}>{formik.errors.password}</span>
            ) : null}
          </div>
          <div className={s.inpPass_container}>
            <InputPassword
              placeholder={'repeat password'}
              className={s.inpPass}
              {...formik.getFieldProps('repeatPassword')}
            />
            {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
              <span className={s.error_message}>{formik.errors.repeatPassword}</span>
            ) : null}
          </div>
          <Button type={'submit'} className={s.btn}>
            Register
          </Button>
        </form>
      </div>
    </div>
  )
}

// Types
type FormikErrorType = Partial<{
  email: string
  password: string
  repeatPassword: string
}>
