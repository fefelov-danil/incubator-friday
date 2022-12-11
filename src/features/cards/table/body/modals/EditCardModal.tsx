import React, { ChangeEvent, FC, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'

import { Button } from 'common/button/Button'
import { InputText } from 'common/inputText/InputText'
import { Modal } from 'common/modal/Modal'
import { SelectImage } from 'common/selectImage/SelectImage'
import { CardType, updateCardTC } from 'features/cards/cards-reducer'
import s from 'features/cards/table/body/TbodyCards.module.css'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

type EditCardModalPropsType = {
  cardId: string
  card: CardType
}
type selectType = 'Text' | 'Pic'

export const EditCardModal: FC<EditCardModalPropsType> = ({ cardId, card }) => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.appStatus)

  const [openModal, setOpenModal] = useState<boolean | null>(null)
  const [questionImg, setQuestionImg] = useState<undefined | string>(card.questionImg)
  const [answerImg, setAnswerImg] = useState<undefined | string>(card.answerImg)
  const [questionText, setQuestionText] = useState(card.question)
  const [answerText, setAnswerText] = useState(card.answer)
  const [questionType, setQuestionType] = useState<selectType>('Text')
  const [answerType, setAnswerType] = useState<selectType>('Text')

  const onQuestionChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionText(e.currentTarget.value)
  }

  const onAnswerChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswerText(e.currentTarget.value)
  }

  const onTypeQuestionChangeHandler = (value: selectType) => {
    if (value === 'Text') {
      setQuestionText(card.question)
      setQuestionImg('null')
    } else {
      setQuestionImg(card.questionImg)
      setQuestionText('')
    }
    setQuestionType(value)
  }

  const onTypeAnswerChangeHandler = (value: selectType) => {
    if (value === 'Text') {
      setAnswerText(card.question)
      setAnswerImg('null')
    } else {
      setAnswerImg(card.questionImg)
      setAnswerText('')
    }
    setAnswerType(value)
  }

  const getInputValues = () => {
    setQuestionType(card?.questionImg && card?.questionImg !== 'null' ? 'Pic' : 'Text')
    setAnswerType(card?.answerImg && card?.answerImg !== 'null' ? 'Pic' : 'Text')
  }

  const editPack = (cardId: string) => {
    dispatch(
      updateCardTC({
        _id: cardId,
        question: questionText,
        answer: answerText,
        questionImg: questionImg,
        answerImg: answerImg,
      })
    )
    setOpenModal(false)
  }

  return (
    <Modal
      setOpenModal={setOpenModal}
      title={'Edit card'}
      childrenOpenModal={
        <IconButton onClick={() => getInputValues()} disabled={appStatus === 'loading'}>
          <EditIcon sx={{ fontSize: 19 }} />
        </IconButton>
      }
      openFromProps={openModal}
    >
      <div className={s.editCardModal}>
        <p>
          <b>Choose a question format</b>
        </p>
        <select
          value={questionType}
          onChange={e => {
            onTypeQuestionChangeHandler(e.currentTarget.value as selectType)
          }}
          id="questionSelect"
        >
          <option value="Text">Text question</option>
          <option value="Pic">Picture</option>
        </select>
        <div className={s.inputBlock}>
          {questionType === 'Pic' && (
            <div className={s.coverBlock}>
              <p>
                <b>Question</b>
              </p>
              <div className={s.selectCover}>
                <SelectImage setCoverImg={setQuestionImg} />
              </div>
              {questionImg ? <img src={questionImg} alt="pack cover" /> : ''}
            </div>
          )}
          {questionType === 'Text' && (
            <div>
              <p>
                <b>Question</b>
              </p>
              <InputText
                onChange={onQuestionChangeHandler}
                placeholder={'Enter your question'}
                value={questionText}
              />
            </div>
          )}
          <p>
            <b>Choose a answer format</b>
          </p>
          <select
            value={answerType}
            onChange={e => {
              onTypeAnswerChangeHandler(e.currentTarget.value as selectType)
            }}
            id="answerSelect"
          >
            <option value="Text">Text answer</option>
            <option value="Pic">Picture</option>
          </select>
          {answerType === 'Pic' && (
            <div className={s.coverBlock}>
              <p>
                <b>Answer</b>
              </p>
              <div className={s.selectCover}>
                <SelectImage setCoverImg={setAnswerImg} />
              </div>
              {answerImg ? <img src={answerImg} alt="cover" /> : ''}
            </div>
          )}
          {answerType === 'Text' && (
            <div>
              <p>
                <b>Answer</b>
              </p>
              <InputText
                onChange={onAnswerChangeHandler}
                placeholder={'Enter your answer'}
                value={answerText}
              />
            </div>
          )}
        </div>
        <div className={'modalButtonBlock'}>
          <Button className={'close'} onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button className={'createPack'} onClick={() => editPack(cardId)}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}
