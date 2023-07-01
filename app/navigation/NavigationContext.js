import React from 'react'
import { useContext } from 'react'

// stack types :  'login' | 'app' | 'loading';

const NavigationContext = React.createContext({
  stack: 'loading',
  setStack: () => {
    // do nothing
  },
})

export const useNavigationContext = () => {
  const navigationContext = useContext(NavigationContext)
  if (navigationContext === undefined) {
    throw new Error('useNavigationContext must be used within a NavigationProvider')
  }
  return navigationContext
}

export default NavigationContext
