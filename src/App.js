import React, { useState, Fragment } from 'react'
import useDataApi from './hooks/useDataApi'

const url = query => `https://hn.algolia.com/api/v1/search?query=${query}`

function App() {
  const [query, setQuery] = useState('redux')
  const [{ data, loading, error }, setUrl] = useDataApi(url('redux'), { hits: [] })

  return (
    <Fragment>
      <form
        onSubmit={e => {
          setUrl(url(query))
          e.preventDefault()
        }}
      >
        <input type="text" value={query} onChange={event => setQuery(event.target.value)}></input>
        <button type="submit">Search</button>
        {error && <div>Something went wrong...</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {data.hits.map(item => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
      </form>
    </Fragment>
  )
}

export default App
