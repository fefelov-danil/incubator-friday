import React from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import SchoolIcon from '@mui/icons-material/School'
import IconButton from '@mui/material/IconButton'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import s from 'features/packs/table/body/TbodyPacks.module.css'

export const TbodyPacks = () => {
  const cardPacks = [
    {
      _id: '6375f0e2560237144cb13881',
      user_id: '6320dc2f45670409e86b0496',
      user_name: 'Danil',
      private: false,
      name: 'Pack 1',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 5,
      type: 'pack',
      rating: 0,
      created: '2022-11-17T08:29:22.425Z',
      updated: '2022-11-18T08:32:10.589Z',
      more_id: '6320dc2f45670409e86b0496',
      __v: 0,
      deckCover: null,
    },
    {
      _id: '6375f0e2560237144cb13882',
      user_id: '6320dc2f45670409e86b0498',
      user_name: 'Danil',
      private: false,
      name: 'Pack 2',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 10,
      type: 'pack',
      rating: 0,
      created: '2022-11-17T08:29:22.425Z',
      updated: '2022-11-21T08:32:10.589Z',
      more_id: '6320dc2f45670409e86b0496',
      __v: 0,
      deckCover: null,
    },
    {
      _id: '6375f0e2560237144cb13883',
      user_id: '6320dc2f45670409e86b0499',
      user_name: 'Danil',
      private: false,
      name: 'Pack 3',
      path: '/def',
      grade: 0,
      shots: 0,
      cardsCount: 0,
      type: 'pack',
      rating: 0,
      created: '2022-11-17T08:29:22.425Z',
      updated: '2022-11-21T08:32:10.589Z',
      more_id: '6320dc2f45670409e86b0496',
      __v: 0,
      deckCover: null,
    },
  ]
  const myId = '6320dc2f45670409e86b0499'

  const studyPack = (packId: string) => {
    console.log('study', packId)
  }
  const editPack = (packId: string) => {
    console.log('edit', packId)
  }
  const deletePack = (packId: string) => {
    console.log('delete', packId)
  }

  const renderActions = (myId: string, userId: string, packId: string) => {
    if (myId === userId) {
      return (
        <TableCell className={s.actions} align="right">
          <IconButton onClick={() => studyPack(packId)}>
            <SchoolIcon sx={{ fontSize: 19 }} />
          </IconButton>
          <IconButton onClick={() => editPack(packId)}>
            <EditIcon sx={{ fontSize: 19 }} />
          </IconButton>
          <IconButton onClick={() => deletePack(packId)}>
            <DeleteIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </TableCell>
      )
    } else {
      return (
        <TableCell className={s.actions} align="right">
          <IconButton onClick={() => studyPack(packId)}>
            <SchoolIcon sx={{ fontSize: 19 }} />
          </IconButton>
        </TableCell>
      )
    }
  }

  const openPack = (packId: string) => {
    console.log('open pack: ', packId)
  }

  return (
    <TableBody className={s.tableBody}>
      {cardPacks.map(pack => {
        const date =
          new Date(pack.updated).getDate() +
          '.' +
          new Date(pack.updated).getMonth() +
          '.' +
          new Date(pack.updated).getFullYear()

        return (
          <TableRow key={pack._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell className={s.packName} component="th" scope="row">
              <button onClick={() => openPack(pack._id)}>{pack.name}</button>
            </TableCell>
            <TableCell align="right">{pack.cardsCount}</TableCell>
            <TableCell align="right">{date}</TableCell>
            <TableCell align="right">{pack.user_name}</TableCell>
            {renderActions(myId, pack.user_id, pack._id)}
          </TableRow>
        )
      })}
    </TableBody>
  )
}
