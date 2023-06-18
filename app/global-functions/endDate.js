const endDate = (dateString) => {
  if (dateString === null) {
    return ''
  }

  const [year, month, day] = dateString.split('-')
  return '-' + day
}

export default endDate
