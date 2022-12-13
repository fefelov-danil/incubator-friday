import React, { ChangeEvent, FC, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'

import { Button } from 'common/button/Button'
import { Modal } from 'common/modal/Modal'
import { SelectImgForModal } from 'common/modal/selectImgForModal/SelectImgForModal'
import { Textarea } from 'common/textarea/Textarea'
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

  const [openModal, setOpenModal] = useState<boolean | null>(null)
  const [inputQuestionValue, setInputQuestionValue] = useState(card.question)
  const [inputAnswerValue, setInputAnswerValue] = useState(card.answer)
  const [coverQuestion, setCoverQuestion] = useState<undefined | string>(card.questionImg)

  const onQuestionChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputQuestionValue(e.currentTarget.value)
  }

  const onAnswerChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputAnswerValue(e.currentTarget.value)
  }

  const editPack = (cardId: string) => {
    dispatch(
      updateCardTC({
        _id: cardId,
        question: inputQuestionValue,
        answer: inputAnswerValue,
        questionImg: coverQuestion,
      })
    )
    setOpenModal(false)
  }

  const disabledEditCard = () => {
    if (!inputQuestionValue || !inputAnswerValue) {
      if (!coverQuestion || !inputAnswerValue) {
        return true
      }
    }

    return false
  }

  return (
    <Modal
      setOpenModal={setOpenModal}
      title={'Edit card'}
      childrenOpenModal={
        <IconButton disabled={appStatus === 'loading'}>
          <EditIcon sx={{ fontSize: 19 }} />
        </IconButton>
      }
      openFromProps={openModal}
    >
      <div className={s.editCardModal}>
        <div className={s.inputBlock}>
          <p>
            <b>Question</b>
          </p>
          <Textarea
            onChange={onQuestionChangeHandler}
            placeholder={'Enter your question'}
            value={inputQuestionValue}
          />
          <SelectImgForModal
            title={'Add an image to the question (optional)'}
            cover={coverQuestion}
            setCoverImg={setCoverQuestion}
          />
          <p>
            <b>Answer</b>
          </p>
          <Textarea
            onChange={onAnswerChangeHandler}
            placeholder={'Enter your answer'}
            value={inputAnswerValue}
          />
        </div>
        <div className={'modalButtonBlock'}>
          <Button className={'close'} onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
          <Button
            disabled={disabledEditCard()}
            className={'createPack'}
            onClick={() => editPack(cardId)}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}
