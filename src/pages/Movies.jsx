import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getYear, shortenOverview } from "../utils";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Movies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    //fetch(url)
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&region=US
`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  console.log(movies);
  const movieEl = movies.map((movie) => (
    <Link to={`${movie.id}`} className="movie-card" key={movie.id}>
      <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} />
      <div className="movie-text">
        <p>
          <strong>Title: </strong>
          {movie.title}
        </p>
        <p>
          <strong>Release Year: </strong>
          {getYear(movie.release_date)}
        </p>
        <p>
          <strong>Overview: </strong>
          {shortenOverview(movie.overview)}
        </p>
      </div>
      <button
        className="btn"
        onClick={() => {
          console.log("clicked");
        }}
      >
        Add to Watchlist
      </button>
    </Link>
  ));
  return (
    <>
      <div className="movies-container">
        <h1 className="page-title">Movie Explorer</h1>
        {movies.length > 0 ? movieEl : <h2>Loading...</h2>}
      </div>
    </>
  );
}

// fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });

// const genres = [
//   { id: 28, name: "Action" },
//   { id: 878, name: "Science Fiction" },
//   { id: 12, name: "Adventure" },
//   { id: 53, name: "Thriller" },
// ];

// console.log(getGenreNames(genres));
