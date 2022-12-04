import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'

import s from './App.module.css'

import mainBg from 'assets/images/fon-1.jpg'
import { AlertSnackbar } from 'common/alertSnackbar/AlertSnackbar'
import 'assets/generalCss/reset.css'
import 'assets/generalCss/style.css'
import { Header } from 'common/header/Header'
import { Pages } from 'common/routes/Pages'
import { authMeTC } from 'features/auth/auth-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const App = () => {
  const dispatch = useAppDispatch()
  const appLoading = useAppSelector(state => state.app.appLoading)
  const status = useAppSelector(state => state.app.appStatus)

  useEffect(() => {
    dispatch(authMeTC())
  }, [])

  return (
    <div className={s.app} style={{ backgroundImage: `url('${mainBg}')` }}>
      <div className={s.linear_progress_container}>
        {status === 'loading' && <LinearProgress />}
      </div>
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
