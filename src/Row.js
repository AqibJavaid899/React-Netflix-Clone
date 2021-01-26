import React, { useState, useEffect } from 'react'
import axios from './axios'
import './Row.css'

const baseURL = 'https://image.tmdb.org/t/p/original/'
const Row = (props) => {

  const [movies, setMovies] = useState([])

    // Calling the TMDB to fetch all the movies related to specific genre
    useEffect(() => {
        const movieFetch = async () => {
            const data = await axios.get(props.fetchURL)
            setMovies(data.data.results)
            return data
        }
        movieFetch()
    },[props.fetchURL])
    
    return (
        <div className='row'>
            <h1>{props.title}</h1>

            <div className='row__posters'>

                {movies.map((movie) => (
                    <img className={`row__poster ${props.isLarge && "row__posterLarge"}`}
                        key={movie.id}
                        src={`${baseURL}${props.isLarge ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                ))}

            </div>

        </div>
    )
}

export default Row
