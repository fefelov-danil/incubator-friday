import React, { ChangeEvent, useEffect, useState } from 'react'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { NavLink, useSearchParams } from 'react-router-dom'

import s from './Learn.module.css'

import { Button } from 'common/button/Button'
import { InputRadio } from 'common/inputRadio/InputRadio'
import { PATH } from 'common/routes/Pages'
import { CardType, setCurrentPackIdAC } from 'features/cards/cards-reducer'
import {
  deleteStudiedCardAC,
  getCardsForLearnTC,
  questionsCompletedAC,
  setCardsPackIdInLearnAC,
  setGrade,
} from 'features/learn/learn-reducer'
import { QuestionsCompleted } from 'features/learn/questionsCompleted/QuestionsCompleted'
import { getCard } from 'utils/get-cards'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

const initialCard = {
  _id: '',
  answer: 'initial answer',
  question: 'initial question',
  cardsPack_id: '',
  grade: 0,
  shots: 0,
  user_id: '',
  created: '',
  updated: '',
}
const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

export const Learn = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.learn.cards)
  const packName = useAppSelector(state => state.learn.packName)
  const cardsPack_id = useAppSelector(state => state.learn.cardsPack_id)
  const questionsCompleted = useAppSelector(state => state.learn.questionsCompleted)

  const [urlParams, setUrlParams] = useSearchParams()

  useEffect(() => {
    const fromUrlCurrentPackId = urlParams.get('currentPackId')

    if (fromUrlCurrentPackId !== null) {
      dispatch(setCardsPackIdInLearnAC(fromUrlCurrentPackId))
    }
  }, [])

  useEffect(() => {
    if (cardsPack_id !== '') {
      setUrlParams({
        currentPackId: `${cardsPack_id}`,
      })
    }

    dispatch(getCardsForLearnTC())
    dispatch(questionsCompletedAC(false))
  }, [])

  const [hideAnswer, setHideAnswer] = useState(true)
  const [currentGrade, setCurrentGrade] = useState(1)

  const [card, setCard] = useState<CardType>(initialCard)

  useEffect(() => {
    if (cards) {
      setCard(getCard(cards))
    }
  }, [cards])

  const updateGrade = (e: ChangeEvent<HTMLInputElement>) => {
    const grade = e.target.value

    setCurrentGrade(grades.findIndex(g => g === grade) + 1)
  }

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

  const backToCardsHandler = () => {
    dispatch(setCurrentPackIdAC(cardsPack_id))
  }

  if (questionsCompleted) {
    return <QuestionsCompleted packName={packName} backToCardsHandler={backToCardsHandler} />
  }

  return (
    <div className={`container ${s.learn}`}>
      <NavLink className={s.backToCards} to={PATH.CARDS} onClick={backToCardsHandler}>
        <ArrowBackIosNewIcon />
        Back to cards
      </NavLink>
      <h1>{packName}</h1>
      <hr />
      <p className={s.question}>
        <b>Question:</b> {card.question}
      </p>
      <p className={s.tryCounts}>Number of answers the question: {card.shots}</p>
      {hideAnswer ? (
        <p className={s.btn}>
          <Button onClick={() => setHideAnswer(false)}>Show answer</Button>
        </p>
      ) : (
        <div className={s.answerBlock}>
          <p className={s.answer}>
            <b>Answer:</b> {card.answer}
          </p>
          <div className={s.rate}>
            <p>
              <b>Rate yourself:</b>
            </p>
            <ul>
              {grades.map((grade, i) => {
                return (
                  <li key={i}>
                    <InputRadio
                      name={'grade'}
                      id={'grade' + i}
                      onChange={updateGrade}
                      value={grade}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
          <p className={s.btn}>
            <Button onClick={nextQuestion}>Next question</Button>
          </p>
        </div>
      )}
    </div>
  )
}
