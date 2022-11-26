import React, { useEffect, useRef, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'

import s from './Modale.module.css'

type ModalProps = {
  title: string
  childrenOpenModal: React.ReactNode
  children: React.ReactNode
  openFromProps?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  childrenOpenModal,
  children,
  title,
  openFromProps,
}) => {
  const [openModal, setOpenModal] = useState(false)

  const modal = useRef(null as HTMLDivElement | null)

  useEffect(() => {
    if (openFromProps !== undefined) {
      setOpenModal(openFromProps)
    }
  }, [openFromProps])

  useEffect(() => {
    if (!openModal) return

    const handleClick = (e: any) => {
      if (!modal.current) return
      if (!modal.current.contains(e.target)) {
        setOpenModal(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [openModal])

  return (
    <div>
      <div className={openModal ? `${s.screenBg} ${s.screenBgIsOpened}` : `${s.screenBg}`}></div>
      <div ref={modal}>
        <div onClick={() => setOpenModal(true)}>{childrenOpenModal}</div>
        <div className={openModal ? `${s.modal} ${s.modalIsOpened}` : `${s.modal}`}>
          <div className={s.titleAndClose}>
            <h2>{title}</h2>
            <div className={s.modalClose}>
              <CloseIcon onClick={() => setOpenModal(false)} />
            </div>
          </div>
          <div className={s.modalBody}>{children}</div>
        </div>
      </div>
    </div>
  )
}
