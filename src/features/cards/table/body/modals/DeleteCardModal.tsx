import React, { FC, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

import { Button } from 'common/button/Button'
import { Modal } from 'common/modal/Modal'
import { CardType, deleteCardTC } from 'features/cards/cards-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

type DeleteCardModalPropsType = {
  cardId: string
  card: CardType
}

export const DeleteCardModal: FC<DeleteCardModalPropsType> = ({ cardId, card }) => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.appStatus)

  const [openModal, setOpenModal] = useState<boolean | null>(null)

  const deleteCard = () => {
    dispatch(deleteCardTC(cardId))
    setOpenModal(false)
  }

  return (
    <Modal
      title={'Delete card'}
      setOpenModal={setOpenModal}
      childrenOpenModal={
        <IconButton disabled={appStatus === 'loading'}>
          <DeleteIcon sx={{ fontSize: 19 }} />
        </IconButton>
      }
      openFromProps={openModal}
    >
      <p>
        Do you really want to delete card - <b>{card.question}</b>
      </p>
      <div className={'modalButtonBlock'}>
        <Button className={'close'} onClick={() => setOpenModal(false)}>
          Close
        </Button>
        <Button className={'del'} onClick={() => deleteCard()}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
