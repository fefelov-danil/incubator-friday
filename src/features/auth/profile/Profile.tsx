import React, { useEffect, useState } from 'react'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import LogoutIcon from '@mui/icons-material/Logout'
import { NavLink } from 'react-router-dom'

import s from './Profile.module.css'

import defaultAvatar from 'assets/images/avatar.jpg'
import { EditableSpan } from 'common/editableSpan/EditableSpan'
import { PATH } from 'common/routes/Pages'
import { SelectImage } from 'common/selectImage/SelectImage'
import { logOutTC, updateProfileTC } from 'features/auth/auth-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const Profile = () => {
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.auth.profile)

  const [coverImg, setCoverImg] = useState<string | undefined>('')

  useEffect(() => {
    if (profile.avatar !== coverImg && coverImg) {
      dispatch(updateProfileTC({ avatar: coverImg }))
    }
  }, [coverImg])

  const updateTitleHandler = (name: string) => {
    dispatch(updateProfileTC({ name }))
  }
  const logoutHandler = () => {
    dispatch(logOutTC())
  }

  return (
    <div className={'formPage'}>
      <div className={s.profile}>
        <NavLink className={s.goToPack} to={PATH.PACKS}>
          <ArrowBackIosNewIcon />
          Go to packs page
        </NavLink>
        <h1>Profile</h1>
        <p className={s.avatar}>
          <img src={profile.avatar ? profile.avatar : defaultAvatar} alt="" />
          <SelectImage setCoverImg={setCoverImg} />
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
