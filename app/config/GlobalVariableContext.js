/* eslint-disable indent */
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DeviceVariables = {
  AUTHORIZATION_HEADER: '',
  LOGGED_IN_USER: '',
  Language: 'en',
}
const AppVariables = {
  API_KEY_HEADER:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2YnRjZGppaWJjYWxlcWpkcmloIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzkzNzMyMzQsImV4cCI6MTk5NDk0OTIzNH0.EBIKVKhd83o2A5LHa0cgqhg1x6TCncoMA77RFoJAx2s',
  ERROR_MESSAGE: '',
  user_can_post: false,
  user_profile_pic_url: '',
  HMS_ROOM_CODE: 'lvg-epvd-kpz',
  user_first_name: '',
  user_last_name: '',
}
const GlobalVariableContext = React.createContext()
const GlobalVariableUpdater = React.createContext()

// Attempt to parse a string as JSON. If the parse fails, return the string as-is.
// This is necessary to account for variables which are already present in local
// storage, but were not stored in JSON syntax (e.g. 'hello' instead of '"hello"').
function tryParseJson(str) {
  try {
    return JSON.parse(str)
  } catch {
    return str
  }
}

class GlobalVariable {
  /**
   *  Filters an object of key-value pairs for those that should be
   *  persisted to storage, and persists them.
   *
   *  @param values Record<string, string>
   */
  static async syncToLocalStorage(values) {
    const update = Object.entries(values)
      .filter(([key]) => key in DeviceVariables)
      .map(([key, value]) => [key, JSON.stringify(value)])

    if (update.length > 0) {
      await AsyncStorage.multiSet(update)
    }

    return update
  }

  static async loadLocalStorage() {
    const entries = await AsyncStorage.multiGet(Object.keys(DeviceVariables))

    // If values isn't set, use the default. These will be written back to
    // storage on the next render.
    const withDefaults = entries.map(([key, value]) => [key, value ? tryParseJson(value) : DeviceVariables[key]])

    return Object.fromEntries(withDefaults)
  }
}

class State {
  static defaultValues = {
    ...AppVariables,
    ...DeviceVariables,
  }

  static reducer(state, { type, payload }) {
    switch (type) {
      case 'RESET':
        return { values: State.defaultValues, __loaded: true }
      case 'LOAD_FROM_ASYNC_STORAGE':
        return { values: { ...state.values, ...payload }, __loaded: true }
      case 'UPDATE':
        return state.__loaded
          ? {
              ...state,
              values: {
                ...state.values,
                [payload.key]: payload.value,
              },
            }
          : state
      default:
        return state
    }
  }

  static initialState = {
    __loaded: false,
    values: State.defaultValues,
  }
}

export function GlobalVariableProvider({ children }) {
  const [state, dispatch] = React.useReducer(State.reducer, State.initialState)

  // This effect runs on mount to overwrite the default value of any
  // key that has a local value.
  React.useEffect(() => {
    async function initialStorageLoader() {
      try {
        const payload = await GlobalVariable.loadLocalStorage()
        dispatch({ type: 'LOAD_FROM_ASYNC_STORAGE', payload })
      } catch (err) {
        console.error(err)
      }
    }
    initialStorageLoader()
  }, [])

  // This effect runs on every state update after the initial load. Gives us
  // best of both worlds: React state updates sync, but current state made
  // durable next async tick.
  React.useEffect(() => {
    async function syncToAsyncStorage() {
      try {
        await GlobalVariable.syncToLocalStorage(state.values)
      } catch (err) {
        console.error(err)
      }
    }
    if (state.__loaded) {
      syncToAsyncStorage()
    }
  }, [state])

  // We won't want an app to read a default state when there might be one
  // incoming from storage.
  if (!state.__loaded) {
    return null
  }

  return (
    <GlobalVariableUpdater.Provider value={dispatch}>
      <GlobalVariableContext.Provider value={state.values}>{children}</GlobalVariableContext.Provider>
    </GlobalVariableUpdater.Provider>
  )
}

// Hooks
export function useSetValue() {
  const dispatch = React.useContext(GlobalVariableUpdater)
  return ({ key, value }) => {
    dispatch({ type: 'UPDATE', payload: { key, value } })
    return value
  }
}

export function useValues() {
  return React.useContext(GlobalVariableContext)
}
