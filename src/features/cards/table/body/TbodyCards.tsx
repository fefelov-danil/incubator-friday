import React, { ChangeEvent, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import StarIcon from '@mui/icons-material/Star'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import s from './TbodyCards.module.css'

import { Button } from 'common/button/Button'
import { InputText } from 'common/inputText/InputText'
import { Modal } from 'common/modal/Modal'
import { deleteCardTC, updateCardTC } from 'features/cards/cards-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const TbodyCards = () => {
  const dispatch = useAppDispatch()

  const cards = useAppSelector(state => state.cards.cards)
  const myId = useAppSelector(state => state.auth.profile._id)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const [openModal, setOpenModal] = useState<boolean | null>(null)
  const [openRenameModal, setOpenRenameModal] = useState<boolean | null>(null)
  const [inputQuestionValue, setInputQuestionValue] = useState<string>('')
  const [inputAnswerValue, setInputAnswerValue] = useState<string>('')
  const [questionTypeValue, setQuestionTypeValue] = useState<string>('Text')

  const getInputValues = (cardId: string) => {
    const card = cards?.find(c => c._id === cardId)

    if (card) {
      setInputQuestionValue(card.question)
      setInputAnswerValue(card.answer)
    }
    if (card?.questionImg && card?.questionImg !== '') {
      setQuestionTypeValue('Pic')
    } else {
      setQuestionTypeValue('Text')
    }
  }

  const editPack = (cardId: string) => {
    questionTypeValue === 'Text'
      ? dispatch(
          updateCardTC({ _id: cardId, question: inputQuestionValue, answer: inputAnswerValue })
        )
      : dispatch(
          updateCardTC({
            _id: cardId,
            question: inputQuestionValue,
            answer: inputAnswerValue,
            questionImg: 'Pic',
          })
        )
    setOpenRenameModal(false)
  }

  const deleteCard = (cardId: string) => {
    dispatch(deleteCardTC(cardId))
    setOpenModal(false)
  }

  const onQuestionChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputQuestionValue(e.currentTarget.value)
  }

  const onAnswerChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputAnswerValue(e.currentTarget.value)
  }

  const onTypeQuestionChangeHandler = (value: string) => {
    setQuestionTypeValue(value)
  }

  const renderActions = (myId: string, userId: string, cardId: string) => {
    if (myId === userId) {
      return (
        <div className={s.actions}>
          <Modal
            setOpenModal={setOpenRenameModal}
            title={'Edit card'}
            childrenOpenModal={
              <IconButton onClick={() => getInputValues(cardId)} disabled={appStatus === 'loading'}>
                <EditIcon sx={{ fontSize: 19 }} />
              </IconButton>
            }
            openFromProps={openRenameModal}
          >
            <div className={s.editCardModal}>
              <p>
                <b>Choose a question format</b>
              </p>
              <select
                value={questionTypeValue}
                onChange={e => {
                  onTypeQuestionChangeHandler(e.currentTarget.value)
                }}
                id="select"
              >
                <option value="Text">Text question</option>
                <option value="Pic">Picture</option>
              </select>
              <div className={s.inputBlock}>
                <p>
                  <b>Question</b>
                </p>
                <InputText onChange={onQuestionChangeHandler} value={inputQuestionValue} />
                <p>
                  <b>Answer</b>
                </p>
                <InputText onChange={onAnswerChangeHandler} value={inputAnswerValue} />
              </div>
              <div className={'modalButtonBlock'}>
                <Button className={'close'} onClick={() => setOpenRenameModal(false)}>
                  Cancel
                </Button>
                <Button className={'createPack'} onClick={() => editPack(cardId)}>
                  Save
                </Button>
              </div>
            </div>
          </Modal>
          <Modal
            title={'Delete card'}
            setOpenModal={setOpenModal}
            childrenOpenModal={
              <IconButton onClick={() => getInputValues(cardId)} disabled={appStatus === 'loading'}>
                <DeleteIcon sx={{ fontSize: 19 }} />
              </IconButton>
            }
            openFromProps={openModal}
          >
            <p>
              Do you really want to delete card - <b>{inputQuestionValue}</b>
            </p>
            <div className={'modalButtonBlock'}>
              <Button className={'close'} onClick={() => setOpenModal(false)}>
                Close
              </Button>
              <Button className={'del'} onClick={() => deleteCard(cardId)}>
                Delete
              </Button>
            </div>
          </Modal>
        </div>
      )
    }
  }

  const renderStars = (countStars: number) => {
    const fiveStars = [1, 1, 1, 1, 1]

    countStars = Math.floor(countStars * 10) / 10

    return (
      <div className={s.stars}>
        {fiveStars.map((s, i) => {
          if (countStars >= i + 1) {
            return <StarIcon key={i} sx={{ fontSize: 19, color: '#FF0808' }} />
          }
          if (countStars > i && countStars < i + 1) {
            let percent = (countStars - i) * 100

            return (
              <div key={i}>
                <StarIcon sx={{ fontSize: 19, color: '#CDCDCD' }} />
                <StarIcon
                  sx={{
                    fontSize: 19,
                    color: '#FF0808',
                    clipPath: `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0% 100%)`,
                  }}
                />
              </div>
            )
          }

          return <StarIcon key={i} sx={{ fontSize: 19, color: '#CDCDCD' }} />
        })}
      </div>
    )
  }

  return (
    cards && (
      <TableBody className={s.tableBody}>
        {cards.map(card => {
          const date =
            new Date(card.updated).getDate() +
            '.' +
            (new Date(card.updated).getMonth() + 1) +
            '.' +
            new Date(card.updated).getFullYear()

          return (
            <TableRow
              key={card._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={myId === card.user_id ? s.my : s.user}
            >
              <TableCell className={s.cardNameContainer} component="th" scope="row">
                <img className={s.cardCover} alt={''} src={card.questionImg} />
                {card.question === 'no question' ? (
                  ''
                ) : (
                  <span className={s.text}>{card.question}</span>
                )}
              </TableCell>
              <TableCell align="left">
                <span className={s.text}>{card.answer}</span>
              </TableCell>
              <TableCell align="center">{date}</TableCell>
              <TableCell
                align="right"
                className={myId === card.user_id ? s.withActions : s.withoutActions}
              >
                <div className={s.starsAndActions}>
                  {renderStars(card.grade)}
                  {renderActions(myId, card.user_id, card._id)}
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    )
  )
}
