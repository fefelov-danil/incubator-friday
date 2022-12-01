import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import SchoolIcon from '@mui/icons-material/School'
import { Input } from '@mui/material'
import IconButton from '@mui/material/IconButton/IconButton'
import { Navigate, NavLink } from 'react-router-dom'

import { Modal } from '../../common/modal/Modal'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'

import s from './Cards.module.css'

import { Button } from 'common/button/Button'
import { Paginator } from 'common/paginator/Paginator'
import { PATH } from 'common/routes/Pages'
import { createNewCardTC, getCardsTC, setCurrentCardsPageAC } from 'features/cards/cards-reducer'
import { CardsTable } from 'features/cards/table/CardsTable'
import { InputSearch } from 'features/packs/filters/inputSearch/InputSearch'
import { deletePackTC, setPagePacksCountAC, updatePackTC } from 'features/packs/packs-reducer'

export const Cards = () => {
  const dispatch = useAppDispatch()
  const myId = useAppSelector(state => state.auth.profile._id)
  const cardPacks = useAppSelector(state => state.packs.cardPacks)
  const packId = useAppSelector(state => state.cards.currentPackId)
  const userPackId = useAppSelector(state => state.cards.packUserId)
  const cardsPack_id = useAppSelector(state => state.cards.currentPackId)
  const page = useAppSelector(state => state.cards.page)
  const pageCount = useAppSelector(state => state.cards.pageCount)
  const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
  const filterSearchValue = useAppSelector(state => state.cards.filterSearchValue)

  const [openActions, setOpenActions] = useState(false)
  const [openModal, setOpenModal] = useState<boolean | null>(null)
  const [inputQuestionValue, setInputQuestionValue] = useState<string>('')
  const [inputAnswerValue, setInputAnswerValue] = useState<string>('')
  const [questionTypeValue, setQuestionTypeValue] = useState<string>('Text')

  const actions = useRef(null as HTMLDivElement | null)

  const onQuestionChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputQuestionValue(e.currentTarget.value)
  }

  const onAnswerChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputAnswerValue(e.currentTarget.value)
  }

  const onTypeQuestionChangeHandler = (value: string) => {
    setQuestionTypeValue(value)
  }

  useEffect(() => {
    if (!openActions) return

    const handleClick = (e: any) => {
      if (!actions.current) return
      if (!actions.current.contains(e.target)) {
        setOpenActions(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [openActions])

  useEffect(() => {
    dispatch(getCardsTC())
  }, [page, pageCount, filterSearchValue])

  const addNewCard = () => {
    setOpenModal(false)
    if (questionTypeValue === 'Text') {
      dispatch(
        createNewCardTC({ cardsPack_id, question: inputQuestionValue, answer: inputAnswerValue })
      )
    } else {
      dispatch(
        createNewCardTC({
          cardsPack_id,
          question: inputQuestionValue,
          answer: inputAnswerValue,
          questionImg: 'Pic',
        })
      )
    }
    setInputQuestionValue('')
    setInputAnswerValue('')
  }

  const editPack = () => dispatch(updatePackTC({ _id: packId, name: 'edited PACK' }))

  const deletePack = () => dispatch(deletePackTC(packId, 'cards'))

  const renderMainActions = (myId: string, userId: string) => {
    let packName

    if (cardPacks) {
      const pack = cardPacks.find(pack => pack._id === cardsPack_id)

      packName = pack?.name
    }

    if (myId === userId) {
      return (
        <div className={s.titleAndBtn}>
          <div>
            <h1>{packName}</h1>
            <div ref={actions} className={s.actions}>
              <IconButton onClick={() => setOpenActions(!openActions)} className={s.dotsForActions}>
                <MoreVertIcon />
              </IconButton>
              <div
                className={
                  openActions
                    ? `${s.actionsPopUp} ${s.actionsIsOpened}`
                    : `${s.actionsPopUp} ${s.actionsIsClosed}`
                }
              >
                <button className={s.action} onClick={editPack}>
                  <EditIcon sx={{ fontSize: 19 }} /> Edit
                </button>
                <button className={s.action} onClick={deletePack}>
                  <DeleteIcon sx={{ fontSize: 19 }} /> Delete
                </button>
                <NavLink className={s.action} to={PATH.LEARN}>
                  <SchoolIcon sx={{ fontSize: 19 }} /> Learn
                </NavLink>
              </div>
            </div>
          </div>
          <Modal
            title={'Add new card'}
            childrenOpenModal={<Button onClick={() => setOpenModal(true)}>Add new card</Button>}
            openFromProps={openModal}
          >
            <div className={s.createCardModal}>
              <p>Choose a question format</p>
              <select
                value={questionTypeValue}
                onChange={e => {
                  onTypeQuestionChangeHandler(e.currentTarget.value)
                }}
                id="select"
              >
                <option value="Text">Text</option>
                <option value="Pic">Pic</option>
              </select>
              <div className={s.inputBlock}>
                Question
                <Input onChange={onQuestionChangeHandler} value={inputQuestionValue} />
              </div>
              <div className={s.inputBlock}>
                Answer
                <Input onChange={onAnswerChangeHandler} value={inputAnswerValue} />
              </div>
              <div className={s.modalButtonBlock}>
                <Button className={s.close} onClick={() => setOpenModal(false)}>
                  Cancel
                </Button>
                <Button className={s.createPack} onClick={addNewCard}>
                  Add card
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )
    }
    if (myId !== userId) {
      return (
        <div className={s.titleAndBtn}>
          <h1>{packName}</h1>
          <Button>
            <NavLink className={s.learnBtn} to={PATH.LEARN}>
              Learn to pack
            </NavLink>
          </Button>
        </div>
      )
    }
  }

  const setCurrentPage = (newCurrentPage: number) => {
    dispatch(setCurrentCardsPageAC(newCurrentPage))
  }

  const setPageItemsCount = (count: number) => {
    dispatch(setPagePacksCountAC(count))
  }

  if (cardsPack_id === '') {
    return <Navigate to={PATH.PACKS} />
  }

  return (
    <div className={'container container-with-table'}>
      <div className={s.cards}>
        <p className={s.backToPacks}>
          <NavLink to={PATH.PACKS} className={s.backToPacks}>
            <NavigateBeforeIcon sx={{ fontSize: 26 }} />
            Back to Packs List
          </NavLink>
        </p>
        {renderMainActions(myId, userPackId)}
        <div className={s.search}>
          <p className={s.filterName}>Search</p>
          <InputSearch whose={'cards'} placeholder={'Provide your text'} />
        </div>
        <CardsTable />
        <Paginator
          name={'CARDS'}
          currentPage={page}
          onPageChange={setCurrentPage}
          onPageItemsCountChange={setPageItemsCount}
          pageSize={pageCount}
          portionSize={5}
          totalItemsCount={cardsTotalCount}
        />
      </div>
    </div>
  )
}
