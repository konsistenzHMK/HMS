import * as React from 'react'
import { useQuery } from 'react-query'
import { useIsFocused } from '@react-navigation/native'
import usePrevious from '../utils/usePrevious'
import * as GlobalVariables from '../config/GlobalVariableContext'

export const fetchTeamsGETStatusAndText = (Constants) =>
  fetch('https://example-data.draftbit.com/teams', {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const fetchTeamsGET = (Constants) =>
  fetchTeamsGETStatusAndText(Constants).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useFetchTeamsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['teams', args], () => fetchTeamsGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchFetchTeamsGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useFetchTeamsGET({}, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchFetchTeams: refetch })
}

export const usersGETStatusAndText = (Constants, { limit }) =>
  fetch(`https://example-data.draftbit.com/users?_limit=${limit ?? ''}`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const usersGET = (Constants, { limit }) =>
  usersGETStatusAndText(Constants, { limit }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useUsersGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['Users', args], () => usersGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchUsersGET = ({ children, onData = () => {}, refetchInterval, limit }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useUsersGET({ limit }, { refetchInterval })

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch()
    }
  }, [isFocused, prevIsFocused])

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText)
      console.error(error)
    }
  }, [error])
  React.useEffect(() => {
    if (data) {
      onData(data)
    }
  }, [data])

  return children({ loading, data, error, refetchUsers: refetch })
}
