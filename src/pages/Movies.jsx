import { Await, defer, Link, useLoaderData } from "react-router-dom";
import { getYear, shortenOverview, getMovies } from "../utils";
import { Suspense } from "react";
import LoadingSpinner from "../component/LoadingSpinner";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&region=US`;

export function loader() {
  return defer({ movies: getMovies(url) });
}

export default function Movies() {
  // const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;

  const movieData = useLoaderData();
  function renderMovies(movies) {
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
        {/* <button
          className="btn"
          onClick={() => {
            console.log("clicked");
          }}
        >
          Add to Watchlist
        </button> */}
      </Link>
    ));
    return (
      <div className="movies-container">
        <h1 className="page-title">Movie Explorer</h1>
        {movieEl}
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={movieData.movies}>{renderMovies}</Await>
    </Suspense>
  );
}
