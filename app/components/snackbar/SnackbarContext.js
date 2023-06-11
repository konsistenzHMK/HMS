import React, { useContext } from 'react'

export const SnackbarContext = React.createContext({
  show: ({ title, autoHide, variant, delay }) => {},
})

export const useSnackbar = () => {
  const snackbarContext = useContext(SnackbarContext)
  if (!snackbarContext) {
    throw new Error('useSnackbar must be used within a SnackbarProvider')
  }
  return snackbarContext
}
