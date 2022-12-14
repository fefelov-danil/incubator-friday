import React, { ChangeEvent, useState } from 'react'

import s from './AddNewPackModal.module.css'

import { Button } from 'common/button/Button'
import { Checkbox } from 'common/checkbox/Checkbox'
import { InputText } from 'common/inputText/InputText'
import { Modal } from 'common/modal/Modal'
import { SelectImgForModal } from 'common/modal/selectImgForModal/SelectImgForModal'
import { addPackTC } from 'features/packs/packs-reducer'
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
        <div className={s.inputBlock}>
          <InputText
            className={s.inpName}
            onChange={onChangeHandler}
            placeholder={'Enter Pack name'}
            value={inputValue}
          />
          <SelectImgForModal
            className={s.addPackImg}
            title={'Add an image to the Pack (optional)'}
            cover={cover}
            setCoverImg={setCover}
          />
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
