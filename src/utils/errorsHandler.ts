import axios, { AxiosError } from 'axios'
import { Dispatch } from 'redux'

import { AppActionsType, setAppAlertAC, setAppStatusAC } from '../app/app-reducer'

export const errorUtils = (
  e: Error | AxiosError<{ error: string }>,
  dispatch: Dispatch<AppActionsType>
) => {
  const err = e as Error | AxiosError<{ error: string }>

  if (axios.isAxiosError(err)) {
    const error = err.response?.data ? err.response.data.error : err.message

    dispatch(setAppAlertAC(error, 'error'))
  } else {
    dispatch(setAppAlertAC(`Native error ${err.message}`, 'error'))
  }
  dispatch(setAppStatusAC('idle'))
}
