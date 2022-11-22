import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'

import { TbodyPacks } from 'features/packs/table/body/TbodyPacks'
import { TheadPacks } from 'features/packs/table/head/TheadPacks'

export const PacksTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TheadPacks />
        <TbodyPacks />
      </Table>
    </TableContainer>
  )
}
