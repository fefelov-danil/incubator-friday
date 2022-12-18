import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'

import { Button } from 'common/button/Button'
import { Checkbox } from 'common/checkbox/Checkbox'
import { InputText } from 'common/inputText/InputText'
import { Modal } from 'common/modal/Modal'
import { SelectImgForModal } from 'common/modal/selectImgForModal/SelectImgForModal'
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
  const [inputPackName, setInputPackName] = useState(packName)
  const [isChecked, setIsChecked] = useState(packPrivate)
  const [cover, setCover] = useState<undefined | string>(deckCover)

  useEffect(() => {
    setCover(deckCover)
  }, [deckCover])

  const onCheckBoxChangeHandler = (checked: boolean) => {
    setIsChecked(checked)
  }

  const editPack = (packId: string) => {
    dispatch(
      updatePackTC({
        _id: packId,
        name: inputPackName,
        private: isChecked,
        deckCover: cover ? cover : '',
      })
    )
    setOpenRenameModal(false)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputPackName(e.currentTarget.value)
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
        <div className={s.inputBlock}>
          <InputText
            className={s.inpName}
            onChange={onChangeHandler}
            placeholder={'Enter Pack name'}
            value={inputPackName}
          />
          <SelectImgForModal
            className={s.editPackImg}
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
          <Button className={'close'} onClick={() => setOpenRenameModal(false)}>
            Cancel
          </Button>
          <Button className={'del'} onClick={() => editPack(packId)}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  )
}
