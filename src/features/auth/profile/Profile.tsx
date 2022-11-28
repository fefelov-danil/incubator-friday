import React from 'react'

import LogoutIcon from '@mui/icons-material/Logout'

import s from './Profile.module.css'

import { EditableSpan } from 'common/editableSpan/EditableSpan'
import { logOutTC, updateProfileTC } from 'features/auth/auth-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const Profile = () => {
  const profile = useAppSelector(state => state.auth.profile)
  const dispatch = useAppDispatch()

  const updateTitleHandler = (name: string) => {
    dispatch(updateProfileTC({ name }))
  }
  const logoutHandler = () => {
    dispatch(logOutTC())
  }

  return (
    <div className={'formPage'}>
      <div className={s.profile}>
        <h1>Profile</h1>

        <p className={s.avatar}>
          <img src={profile.avatar} alt="" />
        </p>

        <p className={s.name}>
          <EditableSpan value={profile.name} updateTitle={updateTitleHandler} disabled={false} />
        </p>
        <p className={s.email}>{profile.email}</p>
        <button className={s.logOut} onClick={logoutHandler}>
          Logout <LogoutIcon />
        </button>
      </div>
    </div>
  )
}
