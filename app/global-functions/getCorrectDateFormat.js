import React from 'react'

const getCorrectDateFormat = (dateString) => {
  var parts = dateString.split('-')
  if (parts.length !== 3) {
    throw new Error('Invalid date format. Expected format: yyyy-mm-dd')
  }
  var year = parts[0]
  var month = parts[1]
  var day = parts[2]

  return day + '-' + month + '-' + year
}

export default getCorrectDateFormat
