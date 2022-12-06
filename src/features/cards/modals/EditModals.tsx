import React, { ChangeEvent, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'

import { Button } from 'common/button/Button'
import { Checkbox } from 'common/checkbox/Checkbox'
import { InputText } from 'common/inputText/InputText'
import { Modal } from 'common/modal/Modal'
import s from 'features/cards/Cards.module.css'
import { updatePackTC } from 'features/packs/packs-reducer'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

export const EditModals = () => {
  const dispatch = useAppDispatch()
  const packId = useAppSelector(state => state.cards.currentPackId)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const [openRenameModal, setOpenRenameModal] = useState<boolean | null>(null)
  const [isChecked, setIsChecked] = useState<boolean | undefined>(false)
  const [inputValue, setInputValue] = useState<string | undefined>('')

  const editPack = () => {
    dispatch(updatePackTC({ _id: cardsPack_id, name: inputValue, private: isChecked })) //  _id колоды обязательно
    setOpenRenameModal(false)
    setInputValue('')
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

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onCheckBoxChangeHandler = (e: boolean) => {
    setIsChecked(e)
  }

  return (
    <Modal
      title={'Pack name'}
      setOpenModal={setOpenRenameModal}
      childrenOpenModal={
        <button
          className={s.action}
          onClick={() => getPackParam(packId)}
          disabled={appStatus === 'loading'}
        >
          <EditIcon sx={{ fontSize: 19 }} /> Edit
        </button>
      }
      openFromProps={openRenameModal}
    >
      <div className={s.editPackModal}>
        <div className={s.inputBlock}>
          <InputText onChange={onChangeHandler} placeholder={'Enter name'} value={inputValue} />
          <Checkbox
            checked={isChecked}
            onChangeChecked={onCheckBoxChangeHandler}
            className={s.checkbox}
          >
            Private pack
          </Checkbox>
        </div>
        <div className={'modalButtonBlock'}>
          <Button className={'close'} onClick={() => setOpenRenameModal(false)}>
            Cancel
          </Button>
          <Button className={'del'} onClick={() => editPack()}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}
