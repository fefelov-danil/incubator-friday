import React from 'react'

import { Checkbox, FormControl, FormControlLabel, FormGroup, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../../app/store'
import { InputPassword } from '../../../common/inputPassword/InputPassword'
import { InputText } from '../../../common/inputText/InputText'
import { useAppDispatch } from '../../../utils/hooks'
import { loginTC } from '../auth-reducer'

import s from './Login.module.css'

import { Button } from 'common/button/Button'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export const Login = () => {
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

  return (
    <div>
      {/*<div className={'formContainer'}>*/}
      {/*<h1>Login</h1>*/}
      {/*<InputText className={s.inpEmail} />*/}
      {/*<InputPassword className={s.inpPass} />*/}
      {/*<Button className={s.btn}>Sign in</Button>*/}

      <form className={'formPage'} onSubmit={formik.handleSubmit}>
        <FormControl className={'formContainer'}>
          <h1>Login</h1>
          <InputText className={s.inpEmail} {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red' }}>{formik.errors.email}</div>
          )}
          <InputPassword className={s.inpPass} {...formik.getFieldProps('password')} />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}
          <Checkbox checked={formik.values.rememberMe} {...formik.getFieldProps('rememberMe')} />
          <Button type={'submit'} className={s.btn}>
            Sign in
          </Button>
          {/*<FormGroup className={'formContainer'}>*/}
          {/*  <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />*/}
          {/*  {formik.touched.email && formik.errors.email && (*/}
          {/*    <div style={{ color: 'red' }}>{formik.errors.email}</div>*/}
          {/*  )}*/}
          {/*  <TextField type="password" label="Password" {...formik.getFieldProps('password')} />*/}
          {/*  {formik.touched.password && formik.errors.password && (*/}
          {/*    <div style={{ color: 'red' }}>{formik.errors.password}</div>*/}
          {/*  )}*/}
          {/*  <FormControlLabel*/}
          {/*    control={<Checkbox />}*/}
          {/*    label="RememberMe"*/}
          {/*    checked={formik.values.rememberMe}*/}
          {/*    {...formik.getFieldProps('rememberMe')}*/}
          {/*  />*/}
          {/*  <Button type={'submit'} className={s.btn}>*/}
          {/*    Sign in*/}
          {/*  </Button>*/}
          {/*</FormGroup>*/}
        </FormControl>
      </form>
    </div>
    // </div>
  )
}
