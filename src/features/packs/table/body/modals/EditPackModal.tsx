import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import { Input } from '@mui/material'
import IconButton from '@mui/material/IconButton'

import defaultCover from 'assets/images/default-pack-cover.png'
import { Button } from 'common/button/Button'
import { Checkbox } from 'common/checkbox/Checkbox'
import { Modal } from 'common/modal/Modal'
import { SelectImage } from 'common/selectImage/SelectImage'
import { updatePackTC } from 'features/packs/packs-reducer'
import s from 'features/packs/table/body/TbodyPacks.module.css'
import { useAppDispatch, useAppSelector } from 'utils/hooks'

type EditPackModalPropsType = {
  packId: string
  packName: string
  packPrivate: boolean
  deckCover: string | undefined
}

export const EditPackModal: FC<EditPackModalPropsType> = ({
  packId,
  packName,
  packPrivate,
  deckCover,
}) => {
  const dispatch = useAppDispatch()
  const appStatus = useAppSelector(state => state.app.appStatus)

  const [openRenameModal, setOpenRenameModal] = useState<boolean | null>(null)
  const [inputValue, setInputValue] = useState(packName)
  const [isChecked, setIsChecked] = useState(packPrivate)
  const [cover, setCover] = useState<undefined | string>(deckCover)

  useEffect(() => {
    setCover(deckCover)
  }, [deckCover])

  const onCheckBoxChangeHandler = (checked: boolean) => {
    setIsChecked(checked)
  }

  const editPack = (packId: string) => {
    dispatch(updatePackTC({ _id: packId, name: packName, private: isChecked, deckCover: cover }))
    setOpenRenameModal(false)
    setInputValue('')
    setCover(undefined)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value)
  }

  return (
    <Modal
      title={'Pack name'}
      setOpenModal={setOpenRenameModal}
      childrenOpenModal={
        <IconButton disabled={appStatus === 'loading'}>
          <EditIcon sx={{ fontSize: 19 }} />
        </IconButton>
      }
      openFromProps={openRenameModal}
    >
      <div className={s.editPackModal}>
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
        <div className={s.modalButtonBlock}>
          <Button className={s.close} onClick={() => setOpenRenameModal(false)}>
            Cancel
          </Button>
          <Button className={s.del} onClick={() => editPack(packId)}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}
