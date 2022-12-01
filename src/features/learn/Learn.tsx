import React, { useEffect, useState } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import { Navigate } from 'react-router-dom'

import s from './Learn.module.css'

import { Button } from 'common/button/Button'
import { InputRadio } from 'common/inputRadio/InputRadio'
import { PATH } from 'common/routes/Pages'
import { CardType } from 'features/cards/cards-reducer'
import { getLearnCardsTC } from 'features/learn/learn-reducer'
import { getCard } from 'utils/get-cards'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const Learn = () => {
  const dispatch = useAppDispatch()
  const learnLoading = useAppSelector(state => state.learn.learnLoading)
  const cards = useAppSelector(state => state.learn.cards) as CardType[]
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const cardPacks = useAppSelector(state => state.packs.cardPacks)

  const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer']

  useEffect(() => {
    if (cardsPack_id !== '') {
      dispatch(getLearnCardsTC(cardsPack_id))
    }
  }, [])

  const [hideAnswer, setHideAnswer] = useState(true)

  const [card, setCard] = useState<CardType>({
    _id: '',
    answer: 'initial answer',
    question: 'initial question',
    cardsPack_id: '',
    grade: 0,
    shots: 0,
    user_id: '',
    created: '',
    updated: '',
  })

  if (cardsPack_id === '') {
    return <Navigate to={PATH.PACKS} />
  }

  if (learnLoading) {
    return (
      <div className={s.learnLoading}>
        <CircularProgress size={80} />
      </div>
    )
  }

  if (card.answer === 'initial answer') {
    setCard(getCard(cards))
  }

  let packName

  if (cardPacks) {
    const pack = cardPacks.find(pack => pack._id === cardsPack_id)

    packName = pack?.name
  }

  return (
    <div className={`container ${s.learn}`}>
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
                    <InputRadio name={'grade'} id={'grade' + i} value={grade} />
                  </li>
                )
              })}
            </ul>
          </div>
          <p className={s.btn}>
            <Button onClick={() => {}}>Next question</Button>
          </p>
        </div>
      )}
    </div>
  )
}
