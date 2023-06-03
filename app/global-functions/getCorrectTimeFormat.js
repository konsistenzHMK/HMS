import React from 'react'

const getCorrectTimeFormat = (timeString) => {
  var parts = timeString.split(':')
  if (parts.length !== 3) {
    throw new Error('Invalid time format. Expected format: hh:mm:ss')
  }
  var hour = parseInt(parts[0])
  var minute = parts[1]
  var second = parts[2]

  var period = 'am'
  if (hour >= 12) {
    period = 'pm'
    if (hour > 12) {
      hour -= 12
    }
  }
  if (hour === 0) {
    hour = 12
  }

  return hour + ':' + minute + ' ' + period
}

export default getCorrectTimeFormat
