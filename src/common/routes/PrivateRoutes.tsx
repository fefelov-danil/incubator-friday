import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { PATH } from 'common/routes/Pages'
import { useAppSelector } from 'utils/hooks'

export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  console.log(isLoggedIn)

  return isLoggedIn ? <Outlet /> : <Navigate to={PATH.LOGIN} />
}
