import React from 'react'

const convertNullToTBD = (inputString) => {
  if (inputString === null || inputString === undefined) {
    return 'TBD'
  }

  return inputString
}

export default convertNullToTBD
