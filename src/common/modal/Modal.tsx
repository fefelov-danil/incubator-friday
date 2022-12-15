import React, { useEffect, useRef, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'

import s from 'common/modal/Modal.module.css'

type ModalProps = {
  title: string
  childrenOpenModal: React.ReactNode
  children: React.ReactNode
  openFromProps?: boolean | null
  setOpenModal?: (openModal: boolean | null) => void
}

export const Modal: React.FC<ModalProps> = ({
  childrenOpenModal,
  children,
  title,
  openFromProps,
  setOpenModal,
}) => {
  const [open, setOpen] = useState(false)

  const modal = useRef(null as HTMLDivElement | null)

  useEffect(() => {
    if (openFromProps !== null) {
      setOpen(!!openFromProps)
    }
  }, [openFromProps])

  useEffect(() => {
    if (!open) return

    const handleClick = (e: any) => {
      if (!modal.current) return
      if (!modal.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [open])

  return (
    <div>
      <div className={open ? `${s.screenBg} ${s.screenBgIsOpened}` : `${s.screenBg}`}></div>
      <div ref={modal}>
        <div
          onClick={() => {
            setOpen(true)
            setOpenModal && setOpenModal(null)
          }}
        >
          {childrenOpenModal}
        </div>
        <div className={open ? `${s.modal} ${s.modalIsOpened}` : `${s.modal}`}>
          <div className={s.titleAndClose}>
            <h2>{title}</h2>
            <div className={s.modalClose}>
              <CloseIcon onClick={() => setOpen(false)} />
            </div>
          </div>
          <div className={s.modalBody}>{children}</div>
        </div>
      </div>
    </div>
  )
}
