import React, { ChangeEvent, useState } from 'react'

import { Button } from 'common/button/Button'
import { Modal } from 'common/modal/Modal'
import { SelectImgForModal } from 'common/modal/selectImgForModal/SelectImgForModal'
import { Textarea } from 'common/textarea/Textarea'
import { createNewCardTC } from 'features/cards/cards-reducer'
import s from 'features/cards/Cards.module.css'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const AddNewCardModal = () => {
  const dispatch = useAppDispatch()
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)

  const [openModal, setOpenModal] = useState<boolean | null>(null)
  const [inputQuestionValue, setInputQuestionValue] = useState<string>('')
  const [inputAnswerValue, setInputAnswerValue] = useState<string>('')
  const [coverQuestion, setCoverQuestion] = useState<undefined | string>(undefined)

  const addNewCard = () => {
    setOpenModal(false)
    dispatch(
      createNewCardTC({
        cardsPack_id,
        question: inputQuestionValue,
        answer: inputAnswerValue,
        questionImg: coverQuestion,
      })
    )
    setInputQuestionValue('')
    setInputAnswerValue('')
    setCoverQuestion(undefined)
  }

  const onQuestionChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputQuestionValue(e.currentTarget.value)
  }

  const onAnswerChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputAnswerValue(e.currentTarget.value)
  }

  const disabledAddCard = () => {
    if (!inputQuestionValue || !inputAnswerValue) {
      if (!coverQuestion || !inputAnswerValue) {
        return true
      }
    }

    return false
  }

  return (
    <Modal
      title={'Add new card'}
      childrenOpenModal={<Button onClick={() => setOpenModal(true)}>Add new card</Button>}
      openFromProps={openModal}
    >
      <div className={s.createCardModal}>
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
          <Button disabled={disabledAddCard()} className={'createPack'} onClick={addNewCard}>
            Add card
          </Button>
        </div>
      </div>
    </Modal>
  )
}
