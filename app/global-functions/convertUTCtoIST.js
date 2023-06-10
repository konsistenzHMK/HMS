const convertUTCtoIST = (utcTime) => {
  // Extract the UTC hours, minutes, and date components
  const [date, time] = utcTime.split('T')
  const [year, month, day] = date.split('-')
  const [hours, minutes] = time.split(':')

  // Set the offset for Indian Standard Time (IST) in minutes (UTC+5:30)
  const istOffsetMinutes = 330

  // Calculate the total minutes for IST
  const totalMinutesIST = parseInt(hours) * 60 + parseInt(minutes) + istOffsetMinutes

  // Calculate the IST hours and minutes
  const istHours = Math.floor(totalMinutesIST / 60) % 24
  const istMinutes = totalMinutesIST % 60

  // Format the IST hours and minutes
  const formattedHours = istHours % 12 || 12
  const formattedMinutes = istMinutes.toString().padStart(2, '0')

  // Determine whether it is AM or PM
  const period = istHours < 12 ? 'am' : 'pm'

  // Get the abbreviated month name
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthName = months[parseInt(month) - 1]

  // Format the IST date in dd-mmm format
  const formattedDate = `${day}-${monthName}`

  // Return the IST date and time as a string
  return `${formattedDate} ${formattedHours}:${formattedMinutes}${period}`
}

export default convertUTCtoIST
