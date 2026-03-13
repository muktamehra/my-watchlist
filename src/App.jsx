import { useState, useEffect, useRef } from 'react'
import './App.css'
import Hero from './Hero'
import Header from './Header'
import Footer from './Footer'
import PopularShows from './PopularShows'

function App() {
const [shows, setShows] = useState([])
const [input, setInput] = useState('')
const [filter, setFilter] = useState('all')
const [genre, setGenre] = useState('Drama')
const [duplicateMessage, setDuplicateMessage] = useState('')

const inputRef = useRef(null)

useEffect(() => {
  const savedShows = localStorage.getItem("shows")
  if (savedShows) {
    setShows(JSON.parse(savedShows))
  }
}, [])

useEffect(() => {
  if (shows.length > 0) {
  localStorage.setItem("shows", JSON.stringify(shows))
  }
}, [shows])


function addShow(title, showGenre) {
  const newTitle = title || input
  const newGenre = showGenre || genre

  if (newTitle === '') return

 if (shows.some(show => show.title.toLowerCase() === newTitle.toLowerCase())) {
  setDuplicateMessage("This movie is already in your watchlist")
  return
}

  setShows([...shows, { id: Date.now(), title: newTitle, watched: false, genre: newGenre }])
  setInput('')
  setDuplicateMessage('')
  inputRef.current.focus()
}

function deleteShow(index) {
  setShows(shows.filter(function(show, i) {
    return i !== index
  }))
}

function toggleWatched(index) {
  setShows(shows.map(function(show, i) {
    if(i === index) {
      return{ ...show, watched: !show.watched, rating: 0 }
    }
    return show
  }))
}

function rateShow(index, rating) {
  setShows(shows.map(function(show, i) {
    if(i === index) {
      return { ...show, rating: rating }
    }
    return show
  }))
}

function changeGenre(index, newGenre) {
  setShows(shows.map(function(show, i) {
    if(i === index) {
      return { ...show, genre: newGenre }
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
      ref ={inputRef}
      type="text" 
      placeholder='Add a movie or show...'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => {                   
        if (e.key === 'Enter') addShow()
      }}
      />
  <select value={genre} onChange={(e) => setGenre(e.target.value)}>
    <option value="Drama">Drama</option>
    <option value="Action">Action</option>
    <option value="Comedy">Comedy</option>
    <option value="Sci-Fi">Sci-Fi</option>
    <option value="Horror">Horror</option>
    <option value="Romance">Romance</option>
    <option value="Documentary">Documentary</option>
  </select>

      <button onClick={() => addShow()}>➕ Add</button>
      </div>

  {duplicateMessage && (
  <p className="duplicate-warning">
    {duplicateMessage}
  </p>
)}

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
  {filteredShows.length === 0 ? (
    <p style={{ textAlign: "center", marginTop: "20px" }}>
      Your watchlist is empty. Add a movie or show to get started.
    </p>
  ) : (
    filteredShows.map(function(show, index) {
      return (
        <li key={show.id}>
          <div>
            <span className={show.watched ? 'watched-title' : 'show-title'}>
              {show.title}
            </span>

            <span 
              className='genre-tag'
              onClick={() => {
                const genres = ['Drama', 'Action', 'Comedy', 'Sci-Fi', 'Horror', 'Romance', 'Documentary']
                const currentIndex = genres.indexOf(show.genre)
                const nextGenre = genres[(currentIndex + 1) % genres.length]
                changeGenre(index, nextGenre)
              }}
              title="Click to change genre"
            >
              {show.genre}
            </span>

            {show.watched && (
              <div className='stars'>
                {[1,2,3,4,5].map(function(star) {
                  return (
                    <span
                      key={star}
                      className={star <= show.rating ? 'star filled' : 'star'}
                      onClick={() => rateShow(index, star)}
                    >
                      ★
                    </span>
                  )
                })}
              </div>
            )}
          </div>

          <div className='btn-group'>
            <button
              className='btn-watched'
              onClick={() => toggleWatched(index)}
            >
              {show.watched ? '✅ Watched' : '👁️ Unwatched'}
            </button>

            <button
              className='btn-delete'
              onClick={() => deleteShow(index)}
            >
              🗑️ Delete
            </button>
          </div>
        </li>
      )
    })
  )}
</ul>
    </div>
    <Footer />
    </div>
  )
}

export default App