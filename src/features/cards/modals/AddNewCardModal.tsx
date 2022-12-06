import React, { ChangeEvent, useState } from 'react'

import defaultCover from '../../../assets/images/default-pack-cover.png'
import { SelectImage } from '../../../common/selectImage/SelectImage'

import { Button } from 'common/button/Button'
import { InputText } from 'common/inputText/InputText'
import { Modal } from 'common/modal/Modal'
import { createNewCardTC } from 'features/cards/cards-reducer'
import s from 'features/cards/Cards.module.css'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const AddNewCardModal = () => {
  const dispatch = useAppDispatch()
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)

  const [openModal, setOpenModal] = useState<boolean | null>(null)
  const [inputQuestionValue, setInputQuestionValue] = useState<string>('')
  const [inputAnswerValue, setInputAnswerValue] = useState<string>('')
  const [questionTypeValue, setQuestionTypeValue] = useState<string>('Text')
  const [cover, setCover] = useState<undefined | string>(undefined)

  const addNewCard = () => {
    setOpenModal(false)
    if (questionTypeValue === 'Text') {
      dispatch(
        createNewCardTC({
          cardsPack_id,
          question: inputQuestionValue,
          answer: inputAnswerValue,
        })
      )
    } else {
      dispatch(
        createNewCardTC({
          cardsPack_id,
          question: inputQuestionValue,
          answer: inputAnswerValue,
          questionImg: cover,
        })
      )
    }
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

  const onTypeQuestionChangeHandler = (value: string) => {
    setQuestionTypeValue(value)
  }

  return (
    <Modal
      title={'Add new card'}
      childrenOpenModal={<Button onClick={() => setOpenModal(true)}>Add new card</Button>}
      openFromProps={openModal}
    >
      <div className={s.createCardModal}>
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
          <option value="Text">Text</option>
          <option value="Pic">Pic</option>
        </select>
        {questionTypeValue === 'Pic' && (
          <div className={s.coverBlock}>
            <div className={s.selectCover}>
              <SelectImage setCoverImg={setCover} />
            </div>
            {cover ? <img src={cover} alt="pack cover" /> : ''}
          </div>
        )}
        <div className={s.inputBlock}>
          {questionTypeValue === 'Text' ? (
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
          ) : (
            ''
          )}
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
          <Button className={'createPack'} onClick={addNewCard}>
            Add card
          </Button>
        </div>
      </div>
    </Modal>
  )
}
