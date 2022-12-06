import React, { ChangeEvent, useState } from 'react'

import { Input } from '@mui/material'

import defaultCover from 'assets/images/default-pack-cover.png'
import { Button } from 'common/button/Button'
import { Checkbox } from 'common/checkbox/Checkbox'
import { Modal } from 'common/modal/Modal'
import { SelectImage } from 'common/selectImage/SelectImage'
import { addPackTC } from 'features/packs/packs-reducer'
import s from 'features/packs/Packs.module.css'
import { useAppDispatch } from 'utils/hooks'

export const AddNewPackModal = () => {
  const dispatch = useAppDispatch()

  const [openModal, setOpenModal] = useState<boolean | null>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [cover, setCover] = useState<undefined | string>(undefined)

  const addPack = () => {
    dispatch(addPackTC({ cardsPack: { name: inputValue, private: isChecked, deckCover: cover } }))
    setInputValue('')
    setIsChecked(false)
    setOpenModal(false)
    setCover(undefined)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const onCheckBoxChangeHandler = (e: boolean) => {
    setIsChecked(e)
  }

  return (
    <Modal
      title={'Add new pack'}
      childrenOpenModal={<Button onClick={() => setOpenModal(true)}>Add new pack</Button>}
      openFromProps={openModal}
    >
      <div className={s.createPackModal}>
        <div className={s.coverBlock}>
          <div className={s.selectCover}>
            <SelectImage setCoverImg={setCover} />
          </div>
          <img src={cover || defaultCover} alt="pack cover" />
        </div>
        <div className={s.inputBlock}>
          <Input onChange={onChangeHandler} value={inputValue} />
          <Checkbox
            checked={isChecked}
            onChangeChecked={onCheckBoxChangeHandler}
            className={s.checkbox}
          >
            Private pack
          </Checkbox>
        </div>
        <div className={'modalButtonBlock'}>
          <Button className={'close'} onClick={() => setOpenModal(false)}>
            No, cancel
          </Button>
          <Button className={'createPack'} onClick={addPack}>
            Add pack
          </Button>
        </div>
      </div>
    </Modal>
  )
}
