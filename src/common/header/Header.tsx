import React from 'react'

import LinearProgress from '@mui/material/LinearProgress'
import { NavLink } from 'react-router-dom'

import { AppStatusType } from '../../app/app-reducer'
import { useAppSelector } from '../../utils/hooks'

import logo from 'assets/images/logo.png'
import s from 'common/header/Header.module.css'
import { PATH } from 'common/pages/Pages'

export const Header = () => {
  const status = useAppSelector<AppStatusType>(state => state.app.appStatus)

  return (
    <div className={s.header}>
      <div className={`container ${s.logo_nav_container}`}>
        <NavLink to={'/'}>
          <img src={logo} alt={'logo'} className={s.logo} />
        </NavLink>
        <div className={s.menu}>
          <NavLink to={PATH.LOGIN}>Login</NavLink>
          <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
          <NavLink to={PATH.PASSWORD_RECOVERY}>Password recovery</NavLink>
          <NavLink to={PATH.CHANGE_PASSWORD}>Change password</NavLink>
          <NavLink to={PATH.PROFILE}>Profile</NavLink>
        </div>
      </div>
      <div className={s.linear_progress_container}>
        {status === 'loading' && <LinearProgress />}
      </div>
    </div>
  )
}
