import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'

import { AlertSnackbar } from '../common/AlertSnackbar/AlertSnackbar'

import s from './App.module.css'

import 'assets/general-css/reset.css'
import 'assets/general-css/style.css'
import mainBg from 'assets/images/fon-1.jpg'
import { Header } from 'common/header/Header'
import { Pages } from 'common/pages/Pages'
import { authMeTC } from 'features/auth/auth-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const App = () => {
  const appLoading = useAppSelector(state => state.app.appLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  return (
    <div className={s.app} style={{ backgroundImage: `url('${mainBg}')` }}>
      {appLoading ? (
        <div className={s.appLoading}>
          <CircularProgress size={80} />
        </div>
      ) : (
        <div>
          <AlertSnackbar />
          <Header />
          <Pages />
        </div>
      )}
    </div>
  )
}
