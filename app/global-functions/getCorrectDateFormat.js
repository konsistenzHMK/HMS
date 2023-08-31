import React from 'react'
const nth = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
};

const getCorrectDateFormat = (dateString) => {
  const [year, month, day] = dateString.split('-')

  // Get the abbreviated month name
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthName = months[parseInt(month) - 1]

  // Format the date in mmm-dd format
  const formattedDate = `${monthName} ${day}`

  return formattedDate
}

export default getCorrectDateFormat
