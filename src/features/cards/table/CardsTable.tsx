import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { TbodyCards } from 'features/cards/table/body/TbodyCards'
import { TheadCards } from 'features/cards/table/head/TheadCards'

export const CardsTable = () => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: '30px' }}>
      <Table>
        <TheadCards />
        <TbodyCards />
      </Table>
    </TableContainer>
  )
}
