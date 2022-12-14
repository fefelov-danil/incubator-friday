import React, { FC } from 'react'

import { NavLink } from 'react-router-dom'

import { Button } from 'common/button/Button'
import { PATH } from 'common/routes/Pages'
import { getCardsForLearnTC, questionsCompletedAC } from 'features/learn/learn-reducer'
import s from 'features/learn/Learn.module.css'
import { useAppDispatch } from 'utils/hooks'

type QuestionsCompletedPropsType = {
  packName: string | undefined
  backToCardsHandler: () => void
}

export const AllQuestionsCompleted: FC<QuestionsCompletedPropsType> = ({
  packName,
  backToCardsHandler,
}) => {
  const dispatch = useAppDispatch()

  const learnAgain = () => {
    dispatch(getCardsForLearnTC())
    dispatch(questionsCompletedAC(false))
  }

  return (
    <div className={`container ${s.learn}`}>
      <h1>{packName}</h1>
      <hr />
      <p className={s.done}>You answered all the questions.</p>
      <div className={s.buttons}>
        <Button onClick={learnAgain}>Try again</Button>
        <NavLink to={PATH.CARDS}>
          <Button onClick={backToCardsHandler}>Go back</Button>
        </NavLink>
      </div>
    </div>
  )
}
