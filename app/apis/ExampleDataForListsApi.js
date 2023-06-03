import * as React from 'react'
import { useQuery } from 'react-query'
import { useIsFocused } from '@react-navigation/native'
import usePrevious from '../utils/usePrevious'
import * as GlobalVariables from '../config/GlobalVariableContext'

export const $SampleRecordsGETStatusAndText = (Constants) =>
  fetch('https://example-data.draftbit.com/podcasts?_limit=4', {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const $SampleRecordsGET = (Constants) =>
  $SampleRecordsGETStatusAndText(Constants).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const use5SampleRecordsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['Examples', args], () => $SampleRecordsGET(Constants, args), {
    refetchInterval,
  })
}

export const Fetch5SampleRecordsGET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = use5SampleRecordsGET({}, { refetchInterval })

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

  return children({ loading, data, error, refetch5SampleRecords: refetch })
}

export const getSampleDataList10GETStatusAndText = (Constants) =>
  fetch('https://example-data.draftbit.com/podcasts?_limit=10', {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  }).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }))

export const getSampleDataList10GET = (Constants) =>
  getSampleDataList10GETStatusAndText(Constants).then(({ status, statusText, text }) => {
    try {
      return JSON.parse(text)
    } catch (e) {
      console.error(
        ['Failed to parse response text as JSON.', `Error: ${e.message}`, `Text: ${JSON.stringify(text)}`].join('\n\n'),
      )
    }
  })

export const useGetSampleDataList10GET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues()
  return useQuery(['Sample Data', args], () => getSampleDataList10GET(Constants, args), {
    refetchInterval,
  })
}

export const FetchGetSampleDataList10GET = ({ children, onData = () => {}, refetchInterval }) => {
  const Constants = GlobalVariables.useValues()
  const isFocused = useIsFocused()
  const prevIsFocused = usePrevious(isFocused)

  const { loading, data, error, refetch } = useGetSampleDataList10GET({}, { refetchInterval })

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

  return children({
    loading,
    data,
    error,
    refetchGetSampleDataList10: refetch,
  })
}
