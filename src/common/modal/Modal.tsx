import React, { useEffect, useRef, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'

import s from './Modale.module.css'

type ModalProps = {
  title: string
  childrenOpenModal: React.ReactNode
  children: React.ReactNode
  openFromProps?: boolean | string
  setOpenModal?: (openModal: boolean | string) => void
}

export const Modal: React.FC<ModalProps> = ({
  childrenOpenModal,
  children,
  title,
  openFromProps,
  setOpenModal,
}) => {
  const [open, setOpen] = useState(false)

  console.log(open, 'first log inside modal')

  const modal = useRef(null as HTMLDivElement | null)

  useEffect(() => {
    console.log('useEffect modal')
    if (openFromProps !== '') {
      setOpen(!!openFromProps)
    }
  }, [openFromProps])

  useEffect(() => {
    if (!open) return

    console.log('useEffect in')
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
            setOpenModal && setOpenModal('')
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
