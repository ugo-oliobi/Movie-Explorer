import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getYear, shortenOverview } from "../utils";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Popular() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);
  //console.log(movies);
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
