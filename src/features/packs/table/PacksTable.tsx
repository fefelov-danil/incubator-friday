import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const cardPacks = [
  {
    _id: '6375f0e2560237144cb13882',
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
    user_id: '6320dc2f45670409e86b0496',
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
    _id: '6375f0e2560237144cb13882',
    user_id: '6320dc2f45670409e86b0496',
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

export const PacksTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Cards</TableCell>
            <TableCell align="right">Last Updated</TableCell>
            <TableCell align="right">Created by</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardPacks.map(pack => {
            const date =
              new Date(pack.updated).getFullYear() +
              '.' +
              new Date(pack.updated).getMonth() +
              '.' +
              new Date(pack.updated).getDate()

            return (
              <TableRow key={pack.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {pack.name}
                </TableCell>
                <TableCell align="right">{pack.cardsCount}</TableCell>
                <TableCell align="right">{date}</TableCell>
                <TableCell align="right">{pack.user_name}</TableCell>
                <TableCell align="right">111</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
