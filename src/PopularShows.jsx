import { useState, useEffect } from 'react'

function PopularShows({ addToWatchlist }) {
  const [movies, setMovies] = useState([])

  const popular = [
    { title: "The Godfather", id: 238 },
    { title: "Inception", id: 27205 },
    { title: "The Dark Knight", id: 155 },
    { title: "Interstellar", id: 157336 },
    { title: "Pulp Fiction", id: 680 },
    { title: "The Shawshank Redemption", id: 278 },
    { title: "Fight Club", id: 550 },
    { title: "Forrest Gump", id: 13 },
  ]

  useEffect(() => {
    const apiKey = import.meta.env.VITE_TMDB_API_KEY
    Promise.all(
      popular.map(function(movie) {
        return fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`)
          .then(function(res) { return res.json() })
          .then(function(data) {
            return {
              title: movie.title,
              poster: `https://image.tmdb.org/t/p/w300${data.poster_path}`,
              genre: data.genres[0]?.name || 'Movie'
            }
          })
      })
    ).then(function(results) {
      setMovies(results)
    })
  }, [])

  return (
    <div className='popular-section'>
      <h2>Popular Picks</h2>
      <div className='popular-grid'>
        {movies.map(function(movie, index) {
          return (
            <div className='popular-card' key={index}>
              <img src={movie.poster} alt={movie.title} />
              <h3>{movie.title}</h3>
              <span className='genre'>{movie.genre}</span>
              <button onClick={() => addToWatchlist(movie.title)}>+ Watchlist</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PopularShows