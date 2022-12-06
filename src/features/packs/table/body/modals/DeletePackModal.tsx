import React, { FC, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

import { Button } from 'common/button/Button'
import { Modal } from 'common/modal/Modal'
import { deletePackTC } from 'features/packs/packs-reducer'
import s from 'features/packs/table/body/TbodyPacks.module.css'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

type DeletePackPropsType = {
  packId: string
  packName: string
}

export const DeletePackModal: FC<DeletePackPropsType> = ({ packId, packName }) => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.appStatus)

  const [openModal, setOpenModal] = useState<boolean | null>(null)

  const deletePack = (packId: string) => {
    dispatch(deletePackTC(packId))
    setOpenModal(false)
  }

  return (
    <Modal
      title={'Delete pack'}
      setOpenModal={setOpenModal}
      childrenOpenModal={
        <IconButton disabled={appStatus === 'loading'}>
          <DeleteIcon sx={{ fontSize: 19 }} />
        </IconButton>
      }
      openFromProps={openModal}
    >
      <p>
        Do you really want to remove <b>{packName}</b>?
      </p>
      <div className={s.modalButtonBlock}>
        <Button className={s.close} onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
        <Button className={s.del} onClick={() => deletePack(packId)}>
          Delete
        </Button>
      </div>
    </Modal>
  )
}
