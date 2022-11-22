import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import StarIcon from '@mui/icons-material/Star'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../../../utils/hooks'

import s from './TbodyCards.module.css'

export const TbodyCards = () => {
  const cards = useAppSelector(state => state.cards.cards)
  const myId = useAppSelector(state => state.auth.profile._id)

  console.log('cards')

  const editPack = (packId: string) => {
    console.log('edit', packId)
  }
  const deletePack = (packId: string) => {
    console.log('delete', packId)
  }

  const renderActions = (myId: string, userId: string, cardId: string) => {
    if (myId === userId) {
      return (
        <div className={s.actions}>
          <IconButton onClick={() => editPack(cardId)}>
            <EditIcon sx={{ fontSize: 19 }} />
          </IconButton>
          <IconButton onClick={() => deletePack(cardId)}>
            <DeleteIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </div>
      )
    }
  }

  const renderStars = (countStars: number) => {
    const fiveStars = [1, 1, 1, 1, 1]

    countStars = Math.floor(countStars * 10) / 10

    return (
      <div className={s.stars}>
        {fiveStars.map((s, i) => {
          if (countStars >= i + 1) {
            return <StarIcon key={i} sx={{ fontSize: 19, color: '#FF0808' }} />
          }
          if (countStars > i && countStars < i + 1) {
            let percent = (countStars - i) * 100

            return (
              <div key={i}>
                <StarIcon sx={{ fontSize: 19, color: '#CDCDCD' }} />
                <StarIcon
                  sx={{
                    fontSize: 19,
                    color: '#FF0808',
                    clipPath: `polygon(0 0, ${percent}% 0, ${percent}% 100%, 0% 100%)`,
                  }}
                />
              </div>
            )
          }

          return <StarIcon key={i} sx={{ fontSize: 19, color: '#CDCDCD' }} />
        })}
      </div>
    )
  }

  return (
    cards && (
      <TableBody className={s.tableBody}>
        {cards.map(card => {
          const date =
            new Date(card.updated).getDate() +
            '.' +
            new Date(card.updated).getMonth() +
            '.' +
            new Date(card.updated).getFullYear()

          return (
            <TableRow key={card._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell className={s.packName} component="th" scope="row">
                <span className={s.text}>{card.answer}</span>
              </TableCell>
              <TableCell align="left">
                <span className={s.text}>{card.question}</span>
              </TableCell>
              <TableCell align="center">{date}</TableCell>
              <TableCell
                align="right"
                className={myId === card.user_id ? s.withActions : s.withoutActions}
              >
                <div className={s.starsAndActions}>
                  {renderStars(card.grade)}
                  {renderActions(myId, card.user_id, card._id)}
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    )
  )
}
