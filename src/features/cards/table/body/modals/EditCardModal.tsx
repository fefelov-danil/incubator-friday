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

export const EditCardModal: FC<EditCardModalPropsType> = ({ cardId, card }) => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.appStatus)

  const [openRenameModal, setOpenRenameModal] = useState<boolean | null>(null)
  const [coverQuestion, setCoverQuestion] = useState<undefined | string>(card.questionImg)
  const [coverAnswer, setCoverAnswer] = useState<undefined | string>(card.answer)
  const [inputQuestionValue, setInputQuestionValue] = useState<string>('')
  const [inputAnswerValue, setInputAnswerValue] = useState<string>('')
  const [questionTypeValue, setQuestionTypeValue] = useState<string>('Text')
  const [answerTypeValue, setAnswerTypeValue] = useState<string>('Text')

  const onQuestionChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputQuestionValue(e.currentTarget.value)
  }

  const onAnswerChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputAnswerValue(e.currentTarget.value)
  }

  const onTypeQuestionChangeHandler = (value: string) => {
    setQuestionTypeValue(value)
  }

  const onTypeAnswerChangeHandler = (value: string) => {
    setAnswerTypeValue(value)
  }

  const getInputValues = () => {
    setInputQuestionValue(card.question)
    setInputAnswerValue(card.answer)

    setQuestionTypeValue(card?.questionImg && card?.questionImg !== '' ? 'Pic' : 'Text')
    setAnswerTypeValue(card?.answerImg && card?.answerImg !== '' ? 'Pic' : 'Text')
  }

  const editCard = (cardId: string) => {
    if (questionTypeValue === 'Text') {
      dispatch(
        updateCardTC({ _id: cardId, question: inputQuestionValue, answer: inputAnswerValue })
      )
    } else {
      if (answerTypeValue === 'Text') {
        dispatch(
          updateCardTC({
            _id: cardId,
            question: inputQuestionValue,
            answer: inputAnswerValue,
            questionImg: coverQuestion,
            answerImg: '',
          })
        )
        setCoverAnswer(undefined)
      } else {
        dispatch(
          updateCardTC({
            _id: cardId,
            question: inputQuestionValue,
            answer: inputAnswerValue,
            questionImg: coverQuestion,
            answerImg: coverAnswer,
          })
        )
      }
    }
    setOpenRenameModal(false)
  }

  return (
    <Modal
      setOpenModal={setOpenRenameModal}
      title={'Edit card'}
      childrenOpenModal={
        <IconButton onClick={() => getInputValues()} disabled={appStatus === 'loading'}>
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
          {questionTypeValue === 'Pic' && (
            <div className={s.coverBlock}>
              <p>
                <b>Question</b>
              </p>
              <div className={s.selectCover}>
                <SelectImage setCoverImg={setCoverQuestion} />
              </div>
              {coverQuestion ? <img src={coverQuestion} alt="pack cover" /> : ''}
            </div>
          )}
          {questionTypeValue === 'Text' && (
            <div>
              <p>
                <b>Question</b>
              </p>
              <InputText
                onChange={onQuestionChangeHandler}
                placeholder={'Enter your question'}
                value={inputQuestionValue}
              />
            </div>
          )}
          <p>
            <b>Choose a answer format</b>
          </p>
          <select
            value={answerTypeValue}
            onChange={e => {
              onTypeAnswerChangeHandler(e.currentTarget.value)
            }}
            id="answerSelect"
          >
            <option value="Text">Text answer</option>
            <option value="Pic">Picture</option>
          </select>
          {answerTypeValue === 'Pic' && (
            <div className={s.coverBlock}>
              <p>
                <b>Answer</b>
              </p>
              <div className={s.selectCover}>
                <SelectImage setCoverImg={setCoverAnswer} />
              </div>
              {coverAnswer ? <img src={coverAnswer} alt="cover" /> : ''}
            </div>
          )}
          {answerTypeValue === 'Text' && (
            <div>
              <p>
                <b>Answer</b>
              </p>
              <InputText
                onChange={onAnswerChangeHandler}
                placeholder={'Enter your answer'}
                value={inputAnswerValue}
              />
            </div>
          )}
        </div>
        <div className={'modalButtonBlock'}>
          <Button className={'close'} onClick={() => setOpenRenameModal(false)}>
            Cancel
          </Button>
          <Button className={'createPack'} onClick={() => editCard(cardId)}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}
