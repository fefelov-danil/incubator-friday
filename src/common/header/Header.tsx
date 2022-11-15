import React from 'react'

import { NavLink } from 'react-router-dom'

import logo from 'assets/images/logo.png'
import { Button } from 'common/button/Button'
import s from 'common/header/Header.module.css'
import { PATH } from 'common/pages/Pages'
import { useAppSelector } from 'utils/hooks'

export const Header = () => {
  const authMe = useAppSelector(state => state.auth.authMe)
  const profile = useAppSelector(state => state.auth.profile)

  return (
    <div className={s.header}>
      <div className="container">
        <NavLink to={'/'}>
          <img src={logo} alt={''} className={s.logo} />
        </NavLink>
        <div className={s.menu}>
          {authMe ? (
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
    </div>
  )
}
