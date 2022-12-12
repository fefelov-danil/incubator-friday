import React, { ChangeEvent, useState } from 'react'

import { Button } from 'common/button/Button'
import { InputText } from 'common/inputText/InputText'
import { Modal } from 'common/modal/Modal'
import { SelectImgForModal } from 'common/modal/selectImgForModal/SelectImgForModal'
import { createNewCardTC } from 'features/cards/cards-reducer'
import s from 'features/cards/Cards.module.css'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const AddNewCardModal = () => {
  const dispatch = useAppDispatch()
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)

  const [openModal, setOpenModal] = useState<boolean | null>(null)
  const [inputQuestionValue, setInputQuestionValue] = useState<string>('')
  const [inputAnswerValue, setInputAnswerValue] = useState<string>('')
  const [cover, setCover] = useState<undefined | string>(undefined)

  const addNewCard = () => {
    setOpenModal(false)
    dispatch(
      createNewCardTC({
        cardsPack_id,
        question: inputQuestionValue,
        answer: inputAnswerValue,
        questionImg: cover,
      })
    )
    setInputQuestionValue('')
    setInputAnswerValue('')
    setCover(undefined)
  }

  const onQuestionChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputQuestionValue(e.currentTarget.value)
  }

  const onAnswerChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputAnswerValue(e.currentTarget.value)
  }

  const disabledAddCard = () => {
    if (!inputQuestionValue || !inputAnswerValue) {
      if (!cover || !inputAnswerValue) {
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
          <InputText
            onChange={onQuestionChangeHandler}
            placeholder={'Enter your question'}
            value={inputQuestionValue}
          />
          <SelectImgForModal
            title={'Add an image to the question (optional)'}
            cover={cover}
            setCoverImg={setCover}
          />
          <p>
            <b>Answer</b>
          </p>
          <InputText
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
