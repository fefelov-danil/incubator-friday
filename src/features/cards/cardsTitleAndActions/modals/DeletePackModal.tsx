import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'

import { Button } from 'common/button/Button'
import { Modal } from 'common/modal/Modal'
import s from 'features/cards/Cards.module.css'
import { deletePackTC } from 'features/packs/packs-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const DeletePackModal = () => {
  const dispatch = useAppDispatch()
  const packName = useAppSelector(state => state.cards.packName)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const [openModal, setOpenModal] = useState<boolean | null>(null)

  const deletePack = () => {
    dispatch(deletePackTC(cardsPack_id, 'cards'))
    setOpenModal(false)
  }

  return (
    <Modal
      title={'Delete pack'}
      setOpenModal={setOpenModal}
      childrenOpenModal={
        <button className={s.action} disabled={appStatus === 'loading'}>
          <DeleteIcon sx={{ fontSize: 19 }} /> Delete
        </button>
      }
      openFromProps={openModal}
    >
      <p>
        Do you really want to remove <b>{packName}</b>?
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
