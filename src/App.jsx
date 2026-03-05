import { useState } from 'react'
import './App.css'
import Hero from './Hero'
import Header from './Header'

function App() {
const [shows, setShows] = useState([])
const [input, setInput] = useState('')
const [filter, setFilter] = useState('all')


function addShow() {
  if (input === '') return
  setShows([...shows, { title: input, watched: false}])
  setInput('')
}

function deleteShow(index) {
  setShows(shows.filter(function(show, i) {
    return i !== index
  }))
}

function toggleWatched(index) {
  setShows(shows.map(function(show, i) {
    if(i === index) {
      return{ ...show, watched: !show.watched }
    }
    return show
  }))
}

const filteredShows = shows.filter(function(show) {
  if (filter === 'all') return true
  if (filter === 'watched') return show.watched === true
  if (filter === 'unwatched') return show.watched === false
})

  return (
    <div>
      <Header />
      <Hero />
      <div className='add-section'>
      <input 
      type="text" 
      placeholder='Add a movie or show...'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {                   
        if (e.key === 'Enter') addShow()
      }}
      />
      <button onClick={addShow}>Add</button>
      </div>
      <div className='filters'>
      <button 
      className={filter === 'all' ? 'active' : ''}
      onClick={() => setFilter('all')}>All</button>
      <button 
      className={filter === 'watched' ? 'active' : ''}
      onClick={() => setFilter('watched')}>Watched</button>
      <button 
      className={filter === 'unwatched' ? 'active' : ''}
      onClick={() => setFilter('unwatched')}>Unwatched</button>
      </div>   
      <ul>
        {filteredShows.map(function(show, index) {
          return (
            <li key={index}>
              <span className={show.watched ? 'watched-title' : 'show-title'}>
                {show.title}
              </span>     
              <div className='btn-group'>         
              <button className='btn-watched'
              onClick={() => toggleWatched(index)}>
                {show.watched ? '✅ Watched' : '👁️ Unwatched'}
              </button>
              <button className='btn-delete'
              onClick={() => deleteShow(index)}>🗑️ Delete</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default App