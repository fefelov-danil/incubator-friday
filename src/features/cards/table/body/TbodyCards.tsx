import React from 'react'

import StarIcon from '@mui/icons-material/Star'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import s from './TbodyCards.module.css'

import { DeleteCardModal } from 'features/cards/table/body/modals/DeleteCardModal'
import { EditCardModal } from 'features/cards/table/body/modals/EditCardModal'
import { useAppSelector } from 'utils/hooks'

export const TbodyCards = () => {
  const cards = useAppSelector(state => state.cards.cards)
  const myId = useAppSelector(state => state.auth.profile._id)

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
            (new Date(card.updated).getMonth() + 1) +
            '.' +
            new Date(card.updated).getFullYear()

          return (
            <TableRow
              key={card._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              className={myId === card.user_id ? s.my : s.user}
            >
              <TableCell className={s.cardNameContainer} component="th" scope="row">
                <img className={s.cardCover} src={card.questionImg} alt={'card cover'} />
                {card.question === 'no question' ? (
                  ''
                ) : (
                  <span className={s.text}>{card.question}</span>
                )}
              </TableCell>
              <TableCell align="left">
                <span className={s.text}>{card.answer}</span>
              </TableCell>
              <TableCell align="center">{date}</TableCell>
              <TableCell
                align="right"
                className={myId === card.user_id ? s.withActions : s.withoutActions}
              >
                <div className={s.starsAndActions}>
                  {renderStars(card.grade)}
                  <div className={s.actions}>
                    {myId === card.user_id && <EditCardModal cardId={card._id} card={card} />}
                    {myId === card.user_id && <DeleteCardModal cardId={card._id} card={card} />}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    )
  )
}
