import React from 'react'

import LinearProgress from '@mui/material/LinearProgress'
import { NavLink } from 'react-router-dom'

import { useAppSelector } from '../../utils/hooks'

import logo from 'assets/images/logo.png'
import { Button } from 'common/button/Button'
import s from 'common/header/Header.module.css'
import { PATH } from 'common/routes/Pages'

export const Header = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const profile = useAppSelector(state => state.auth.profile)

  const status = useAppSelector(state => state.app.appStatus)

  return (
    <div className={s.header}>
      <div className={`container ${s.logo_nav_container}`}>
        <NavLink to={'/'}>
          <img src={logo} alt={'logo'} className={s.logo} />
        </NavLink>
        <div className={s.menu}>
          {isLoggedIn ? (
            <NavLink to={PATH.PROFILE} className={s.login}>
              {profile.name}
              <img src={profile.avatar} alt="" />
            </NavLink>
          ) : (
            <NavLink to={PATH.LOGIN} className={s.signIn}>
              <Button>Sign in</Button>
            </NavLink>
          )}
        </div>
      </div>
      <div className={s.linear_progress_container}>
        {status === 'loading' && <LinearProgress />}
      </div>
    </div>
  )
}
