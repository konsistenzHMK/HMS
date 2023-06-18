import React from 'react'

const isDatetimeInRange = (startDatetime, endDatetime) => {
  const currentDatetime = new Date()

  const start = new Date(startDatetime)
  const end = new Date(endDatetime)

  return currentDatetime >= start && currentDatetime <= end
}

export default isDatetimeInRange
