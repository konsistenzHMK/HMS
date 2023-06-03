export default (value) => {
  if (typeof value === 'string' && value.trim().toLowerCase() === 'false') {
    return false
  } else {
    return Boolean(value)
  }
}
