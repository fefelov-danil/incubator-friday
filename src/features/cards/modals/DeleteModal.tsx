import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'

import { Button } from 'common/button/Button'
import { Modal } from 'common/modal/Modal'
import s from 'features/cards/Cards.module.css'
import { deletePackTC } from 'features/packs/packs-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const DeleteModal = () => {
  const dispatch = useAppDispatch()
  const packId = useAppSelector(state => state.cards.currentPackId)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const [openModal, setOpenModal] = useState<boolean | null>(null)
  const [inputValue, setInputValue] = useState<string | undefined>('')
  const [isChecked, setIsChecked] = useState<boolean | undefined>(false)

  const deletePack = () => {
    dispatch(deletePackTC(cardsPack_id, 'cards'))
    setOpenModal(false)
  }

  const getPackParam = (packId: string) => {
    if (cardPacks !== null && cardPacks.length > 0) {
      const pack = cardPacks.find(p => p._id === packId)

      if (pack) {
        setInputValue(pack.name)
        setIsChecked(pack.private)
      }
    }
  }

  return (
    <Modal
      title={'Delete pack'}
      setOpenModal={setOpenModal}
      childrenOpenModal={
        <button
          className={s.action}
          onClick={() => getPackParam(packId)}
          disabled={appStatus === 'loading'}
        >
          <DeleteIcon sx={{ fontSize: 19 }} /> Delete
        </button>
      }
      openFromProps={openModal}
    >
      <p>
        Do you really want to remove <b>{inputValue}</b>?
      </p>
      <div className={'modalButtonBlock'}>
        <Button className={'close'} onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
        <Button className={'del'} onClick={() => deletePack()}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
