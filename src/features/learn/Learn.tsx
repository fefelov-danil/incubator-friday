import React, { useEffect, useState } from 'react'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { NavLink, useSearchParams } from 'react-router-dom'

import s from './Learn.module.css'

import { PATH } from 'common/routes/Pages'
import { CardType, setCurrentPackIdAC } from 'features/cards/cards-reducer'
import { Answer } from 'features/learn/answer/Answer'
import {
  getCardsForLearnTC,
  questionsCompletedAC,
  setCardsPackIdInLearnAC,
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

export const Learn = () => {
  const dispatch = useAppDispatch()
  const cards = useAppSelector(state => state.learn.cards)
  const packName = useAppSelector(state => state.learn.packName)
  const cardsPack_id = useAppSelector(state => state.learn.cardsPack_id)
  const questionsCompleted = useAppSelector(state => state.learn.questionsCompleted)

  const [card, setCard] = useState<CardType>(initialCard)
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

  useEffect(() => {
    if (cards) {
      setCard(getCard(cards))
    }
  }, [cards])

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
      <Answer card={card} />
    </div>
  )
}
