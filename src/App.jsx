import { useState } from 'react'
import './App.css'
import Hero from './Hero'
import Header from './Header'
import Footer from './Footer'
import PopularShows from './PopularShows'

function App() {
const [shows, setShows] = useState([])
const [input, setInput] = useState('')
const [filter, setFilter] = useState('all')


function addShow(title) {
  const newTitle = title || input
  if (newTitle === '') return
  setShows([...shows, { title: newTitle, watched: false}])
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

const totalShows = shows.length
const watchedShows = shows.filter(function(show) {
  return show.watched === true
}).length

  return (
    <div>
      <Header />
      <div className='container'>
      <Hero />
      <PopularShows addToWatchlist={addShow} />
      <div className='counter'>
          <span>Total: {totalShows}</span>
          <span>Watched: {watchedShows}</span>
          <span>Unwatched: {totalShows - watchedShows}</span>
        </div>
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
      <button onClick={addShow}>➕ Add</button>
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
    <Footer />
    </div>
  )
}

export default App