import React, { FC, useState } from 'react'

import { Button } from 'common/button/Button'
import { CardType } from 'features/cards/cards-reducer'
import { Grade } from 'features/learn/grade/Grade'
import { deleteStudiedCardAC, questionsCompletedAC, setGrade } from 'features/learn/learn-reducer'
import s from 'features/learn/Learn.module.css'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

type AnswerPropsType = {
  card: CardType
}

export const Answer: FC<AnswerPropsType> = ({ card }) => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.learn.cards)

  const [currentGrade, setCurrentGrade] = useState(1)
  const [hideAnswer, setHideAnswer] = useState(true)

  const nextQuestion = async () => {
    setHideAnswer(true)
    await dispatch(setGrade(currentGrade, card._id))

    if (cards && cards.length === 1) {
      dispatch(questionsCompletedAC(true))

      return
    }

    if (cards) {
      const index = cards.findIndex(c => c._id === card._id)

      cards.splice(index, 1)

      dispatch(deleteStudiedCardAC([...cards]))
    }
  }

  if (hideAnswer) {
    return (
      <p className={s.btn}>
        <Button onClick={() => setHideAnswer(false)}>Show answer</Button>
      </p>
    )
  } else {
    return (
      <div className={s.answerBlock}>
        <p className={s.answer}>
          <b>Answer: </b>
          {card.answerImg && card.answerImg !== 'null' ? (
            <img src={card.answerImg} alt={'answer'} />
          ) : (
            card.answer
          )}
        </p>
        <Grade setCurrentGrade={setCurrentGrade} />
        <p className={s.btn}>
          <Button onClick={nextQuestion}>Next question</Button>
        </p>
      </div>
    )
  }
}
