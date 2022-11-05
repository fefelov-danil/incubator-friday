import React  from 'react'
import s from './App.module.css'
import 'assets/general-css/reset.css'
import 'assets/general-css/style.css'
import { Pages } from 'app/Pages'
import { Header } from 'common/header/Header'
import mainBg from 'assets/images/fon-1.jpg'

export const App = () => {

  return (
      <div
          className={s.app}
          style = {{backgroundImage: `url('${mainBg}')`}}>
          <div>
            <Header />
            <Pages />
          </div>
      </div>
  )
}