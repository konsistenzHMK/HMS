import * as React from 'react'
import { useQuery } from 'react-query'
import { useIsFocused } from '@react-navigation/native'
import usePrevious from '../utils/usePrevious'
import * as GlobalVariables from '../config/GlobalVariableContext'

export const getClubsGETStatusAndText = (Constants, { num }) =>
  fetch(`https://example-data.draftbit.com/sneakers/?_limit=${num ?? ''}`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const getClubsGET = (Constants, { num }) =>
  getClubsGETStatusAndText(Constants, { num }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useGetClubsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['sneakers', args], () => getClubsGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchGetClubsGET = ({ children, onData = () => {}, refetchInterval, num }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useGetClubsGET({ num }, { refetchInterval })

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

  return children({ loading, data, error, refetchGetClubs: refetch })
}

export const getEventsGETStatusAndText = (Constants, { limit }) =>
  fetch(`https://example-data.draftbit.com/cars/?_limit=${limit ?? ''}`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const getEventsGET = (Constants, { limit }) =>
  getEventsGETStatusAndText(Constants, { limit }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useGetEventsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['cars', args], () => getEventsGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchGetEventsGET = ({ children, onData = () => {}, refetchInterval, limit }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useGetEventsGET({ limit }, { refetchInterval })

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

  return children({ loading, data, error, refetchGetEvents: refetch })
}

export const postsGETStatusAndText = (Constants, { limit }) =>
  fetch(`https://example-data.draftbit.com/posts?_limit=${limit ?? ''}`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const postsGET = (Constants, { limit }) =>
  postsGETStatusAndText(Constants, { limit }).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const usePostsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['Posts', args], () => postsGET(Constants, args), {
    refetchInterval,
  })
}

export const FetchPostsGET = ({ children, onData = () => {}, refetchInterval, limit }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = usePostsGET({ limit }, { refetchInterval })

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

  return children({ loading, data, error, refetchPosts: refetch })
}
