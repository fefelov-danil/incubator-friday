import React from 'react'

import { useFormik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '../../../common/button/Button'
import { InputPassword } from '../../../common/inputPassword/InputPassword'
import { useAppDispatch } from '../../../utils/hooks'
import { setNewPasswordTC } from '../auth-reducer'

import s from './ChangePassword.module.css'

import { PATH } from 'common/routes/Pages'

type FormikErrorType = {
  password?: string
}

export const ChangePassword = () => {
  const dispatch = useAppDispatch()
  const { token } = useParams()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      password: '',
    },

    validate: values => {
      const errors: FormikErrorType = {}

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 8) {
        errors.password = 'Must be min 8 characters'
      }

      return errors
    },

    onSubmit: values => {
      dispatch(
        setNewPasswordTC({ password: values.password, resetPasswordToken: token ?? '' }, () =>
          navigate(PATH.LOGIN)
        )
      )
    },
  })

  return (
    <div className={'formPage'}>
      <form className={'formContainer'} onSubmit={formik.handleSubmit}>
        <h1>Change password</h1>
        <div className={s.inputContainer}>
          <InputPassword
            placeholder="New Password"
            className={s.inpPass}
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password && (
            <span className={s.formError}>{formik.errors.password}</span>
          )}
        </div>
        <p className={s.note}>
          Create a new password and we will send you further instructions to the email.
        </p>
        <div className={s.btnContainer}>
          <Button className={s.btn}>Create new password</Button>
        </div>
      </form>
    </div>
  )
}
