import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { Tbody } from 'features/packs/table/body/Tbody'
import { Thead } from 'features/packs/table/head/Thead'

export const PacksTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Thead />
        <Tbody />
      </Table>
    </TableContainer>
  )
}
