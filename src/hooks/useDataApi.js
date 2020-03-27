import { useState, useEffect, useReducer } from 'react'
import axios from 'axios'

const actions = {
  FETCH_INIT: 'FETCH_INIT',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAILURE: 'FETCH_FAILURE',
}

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_INIT:
      return {
        ...state,
        loading: true,
        error: false,
      }
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    case actions.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      throw new Error('Wrong action.type, pls check your code')
  }
}

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl)

  const [state, dispatch] = useReducer(dataFetchReducer, {
    loading: false,
    error: false,
    data: initialData,
  })

  useEffect(() => {
    let canceled = false
    const fetchData = async () => {
      dispatch({ type: actions.FETCH_INIT })
      try {
        const result = await axios(url)
        if (!canceled) {
          dispatch({ type: actions.FETCH_SUCCESS, payload: result.data })
        }
      } catch (e) {
        if (!canceled) {
          dispatch({ type: actions.FETCH_FAILURE, payload: e })
        }
      }
    }

    fetchData()

    return () => {
      canceled = true
    }
  }, [url])

  return [state, setUrl]
}

export default useDataApi
