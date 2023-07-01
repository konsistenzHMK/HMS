import * as React from 'react'

export const navigationRef = React.createRef()

/* use this function where you do not have access to the navigation prop */
export const navigate = (routeName, params) => {
  navigationRef.current?.navigate(routeName, params)
}

export const goBack = () => {
  navigationRef.current?.goBack()
}
