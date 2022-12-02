import React, { ChangeEvent, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import { Input } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { NavLink } from 'react-router-dom'

import { Button } from '../../../../common/button/Button'
import { Checkbox } from '../../../../common/checkbox/Checkbox'
import { Modal } from '../../../../common/modal/Modal'
import { PATH } from '../../../../common/routes/Pages'
import { useAppDispatch, useAppSelector } from '../../../../utils/hooks'
import { deletePackTC, updatePackTC } from '../../packs-reducer'

import { setCurrentPackIdAC } from 'features/cards/cards-reducer'
import { setCardsPackIdInLearnAC } from 'features/learn/learn-reducer'
import s from 'features/packs/table/body/TbodyPacks.module.css'

export const TbodyPacks = () => {
  const [openModal, setOpenModal] = useState<boolean | null>(null)
  const [openRenameModal, setOpenRenameModal] = useState<boolean | null>(null)

  const [inputValue, setInputValue] = useState<string | undefined>('')
  const [isChecked, setIsChecked] = useState<boolean | undefined>(false)

  const dispatch = useAppDispatch()

  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const myId = useAppSelector(state => state.auth.profile._id)
  const appStatus = useAppSelector(state => state.app.appStatus)

  const getPackParam = (packId: string) => {
    if (cardPacks !== null && cardPacks.length > 0) {
      const pack = cardPacks.find(p => p._id === packId)

      if (pack) {
        setInputValue(pack.name)
        setIsChecked(pack.private)
      }
    }
  }

  const onCheckBoxChangeHandler = (e: boolean) => {
    setIsChecked(e)
  }

  const studyPack = (packId: string) => {
    dispatch(setCardsPackIdInLearnAC(packId))
  }
  const editPack = (packId: string) => {
    dispatch(updatePackTC({ _id: packId, name: inputValue, private: isChecked }))
    setOpenRenameModal(false)
    setInputValue('')
  }
  const deletePack = (packId: string) => {
    dispatch(deletePackTC(packId))
    setOpenModal(false)
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.currentTarget.value)
  }

  const renderActions = (myId: string, userId: string, packId: string) => {
    if (myId === userId) {
      return (
        <TableCell align="right">
          <div className={s.actions}>
            <NavLink to={PATH.LEARN} onClick={() => studyPack(packId)}>
              <IconButton disabled={appStatus === 'loading'}>
                <SchoolIcon sx={{ fontSize: 19 }} />
              </IconButton>
            </NavLink>
            <Modal
              title={'Pack name'}
              setOpenModal={setOpenRenameModal}
              childrenOpenModal={
                <IconButton onClick={() => getPackParam(packId)} disabled={appStatus === 'loading'}>
                  <EditIcon sx={{ fontSize: 19 }} />
                </IconButton>
              }
              openFromProps={openRenameModal}
            >
              <div className={s.editPackModal}>
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

            <Modal
              title={'Delete pack'}
              setOpenModal={setOpenModal}
              childrenOpenModal={
                <IconButton onClick={() => getPackParam(packId)} disabled={appStatus === 'loading'}>
                  <DeleteIcon sx={{ fontSize: 19 }} />
                </IconButton>
              }
              openFromProps={openModal}
            >
              <p>
                Do you really want to remove <b>{inputValue}</b>?
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
          </div>
        </TableCell>
      )
    } else {
      return (
        <TableCell align="right">
          <div className={s.actions}>
            <NavLink to={PATH.LEARN} onClick={() => studyPack(packId)}>
              <IconButton disabled={appStatus === 'loading'}>
                <SchoolIcon sx={{ fontSize: 19 }} />
              </IconButton>
            </NavLink>
          </div>
        </TableCell>
      )
    }
  }

  const openPack = (cardsPack_id: string) => {
    dispatch(setCurrentPackIdAC(cardsPack_id))
  }

  return (
    cardPacks && (
      <TableBody className={s.tableBody}>
        {cardPacks.map(pack => {
          const date =
            new Date(pack.updated ? pack.updated : '').getDate() +
            '.' +
            (new Date(pack.updated ? pack.updated : '').getMonth() + 1) +
            '.' +
            new Date(pack.updated ? pack.updated : '').getFullYear()

          return (
            <TableRow key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell className={s.packName} component="th" scope="row">
                <NavLink to={PATH.CARDS}>
                  <button disabled={appStatus === 'loading'} onClick={() => openPack(pack._id)}>
                    {pack.name}
                  </button>
                </NavLink>
              </TableCell>
              <TableCell align="right">{pack.cardsCount}</TableCell>
              <TableCell align="right">{pack.user_name}</TableCell>
              <TableCell align="right">{date}</TableCell>
              {renderActions(myId, pack.user_id ? pack.user_id : '', pack._id)}
            </TableRow>
          )
        })}
      </TableBody>
    )
  )
}
