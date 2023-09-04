const LOG_ENABLED = false

export const Logger = {
  log: (...args) => {
    if (LOG_ENABLED) {
      console.log(...args)
    }
  },
  error: (...args) => {
    console.error(...args)
  },
}
