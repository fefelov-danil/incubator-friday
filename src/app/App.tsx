import React from 'react'

import s from './App.module.css'

import 'assets/general-css/reset.css'
import 'assets/general-css/style.css'
import mainBg from 'assets/images/fon-1.jpg'
import { Header } from 'common/header/Header'
import { Pages } from 'common/pages/Pages'

export const App = () => {
  return (
    <div className={s.app} style={{ backgroundImage: `url('${mainBg}')` }}>
      <div>
        <Header />
        <Pages />
      </div>
    </div>
  )
}
