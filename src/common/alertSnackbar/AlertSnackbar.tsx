import React, { SyntheticEvent } from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar'
import { useDispatch } from 'react-redux'

import { setAppAlertAC } from '../../app/app-reducer'

import { useAppSelector } from 'utils/hooks'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function AlertSnackbar() {
  const alert = useAppSelector(state => state.app.appAlert)
  const dispatch = useDispatch()

  const handleClose = (event: Event | SyntheticEvent, reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setAppAlertAC(null, alert.type))
  }

  return (
    <Snackbar open={!!alert.message} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alert.type || 'success'} sx={{ width: '100%' }}>
        {alert.message}
      </Alert>
    </Snackbar>
  )
}
