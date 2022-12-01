import React from 'react'

import { Navigate, Route, Routes } from 'react-router-dom'

import { PageNotFound } from 'common/404/PageNotFound'
import { ChangePassword } from 'features/auth/change-password/ChangePassword'
import { Login } from 'features/auth/login/Login'
import { PasswordRecovery } from 'features/auth/password-recovery/PasswordRecovery'
import { Profile } from 'features/auth/profile/Profile'
import { Registration } from 'features/auth/registration/Registration'
import { Cards } from 'features/cards/Cards'
import { Learn } from 'features/learn/Learn'
import { Packs } from 'features/packs/Packs'
import { useAppSelector } from 'utils/hooks'

export const PATH = {
  LOGIN: '/login',
  REGISTRATION: '/registration',
  PASSWORD_RECOVERY: '/password-recovery',
  CHANGE_PASSWORD: '/set-new-password/:token',
  PROFILE: '/profile',
  PACKS: '/packs',
  CARDS: '/cards',
  LEARN: '/learn',
}

export const Pages = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  // return (
  //   <>
  //     <Routes>
  //       <Route element={<PrivateRoutes />}>
  //         <Route path={'/'} element={<Navigate to={PATH.PROFILE} />} />
  //         {/*<Route path={'/login'} element={<Profile />} />*/}
  //         <Route path={PATH.PROFILE} element={<Profile />} />
  //       </Route>
  //       <Route path={PATH.LOGIN} element={<Login />} />
  //       <Route path={PATH.REGISTRATION} element={<Registration />} />
  //       <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
  //       <Route path={PATH.CHANGE_PASSWORD} element={<ChangePassword />} />
  //       <Route path={'/404'} element={<PageNotFound />} />
  //       <Route path={'*'} element={<Navigate to={'/404'} />} />
  //     </Routes>
  //   </>
  // )

  return (
    <div>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path={'/'} element={<Navigate to={PATH.PACKS} />} />
            <Route path={PATH.LOGIN} element={<Navigate to={PATH.PACKS} />} />
            <Route path={PATH.PROFILE} element={<Profile />} />
            <Route path={PATH.PACKS} element={<Packs />} />
            <Route path={PATH.CARDS} element={<Cards />} />
            <Route path={PATH.LEARN} element={<Learn />} />
          </>
        ) : (
          <>
            <Route path={'/'} element={<Navigate to={PATH.LOGIN} />} />
            <Route path={PATH.PROFILE} element={<Navigate to={PATH.LOGIN} />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTRATION} element={<Registration />} />
            <Route path={PATH.PASSWORD_RECOVERY} element={<PasswordRecovery />} />
            <Route path={PATH.CHANGE_PASSWORD} element={<ChangePassword />} />
          </>
        )}
        <Route path={'/404'} element={<PageNotFound />} />
        <Route path={'*'} element={<Navigate to={'/404'} />} />
      </Routes>
    </div>
  )
}
