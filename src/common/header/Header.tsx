import React from 'react'
import s from 'common/header/Header.module.css'
import logo from 'assets/images/logo.png'
import { NavLink } from 'react-router-dom'
import {PATH} from "app/Pages";

export const Header = () => {

  return (
      <div className={s.header}>
          <div className="container">
              <NavLink to={'/'}>
                  <img src={logo} alt={''} className={s.logo} />
              </NavLink>
              <div className={s.menu}>
                  <NavLink to={PATH.LOGIN}>Login</NavLink>
                  <NavLink to={PATH.REGISTRATION}>Registration</NavLink>
                  <NavLink to={PATH.PASSWORD_RECOVERY}>Password recovery</NavLink>
                  <NavLink to={PATH.CHANGE_PASSWORD}>Change password</NavLink>
                  <NavLink to={PATH.PROFILE}>Profile</NavLink>
              </div>
          </div>
      </div>
  )
}