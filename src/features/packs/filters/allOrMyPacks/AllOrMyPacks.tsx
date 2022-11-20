import React, { useState } from 'react'

import s from 'features/packs/filters/allOrMyPacks/AllOrMyPacks.module.css'

type AllOrMyCardsPropsType = {
  myPacks: boolean
  changeAllOrMyPacks: (my: boolean) => void
}

export const AllOrMyPacks: React.FC<AllOrMyCardsPropsType> = ({ myPacks, changeAllOrMyPacks }) => {
  const [showMyPacks, setShowMyPacks] = useState(myPacks)

  const changeAllOrMyPacksHandler = (my: boolean) => {
    setShowMyPacks(my)
    changeAllOrMyPacks(my)
  }

  return (
    <div className={s.buttons}>
      <button
        className={showMyPacks ? s.active : ''}
        onClick={() => changeAllOrMyPacksHandler(true)}
      >
        My
      </button>
      <button
        className={!showMyPacks ? s.active : ''}
        onClick={() => changeAllOrMyPacksHandler(false)}
      >
        All
      </button>
    </div>
  )
}
