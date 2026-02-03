import {
  Link,
  useSearchParams,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getMovies, getYear, shortenOverview } from "../utils";
import logo from "../assets/image/movieLogo.svg";
import { Suspense } from "react";
import LoadingSpinner from "../component/loadingSpinner";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export function loader({ request }) {
  const url = new URL(request.url);

  const query = url.searchParams.get("query");
  const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
  return defer({ movies: getMovies(movieUrl) });
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const data = useLoaderData();

  function renderMovies(result) {
    const movieEl = result.map((movie) => (
      <Link
        to={`${movie.id}`}
        className="movie-card"
        key={movie.id}
        state={{ search: `?${searchParams.toString()}` }}
      >
        <div className="img-logo-container">
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : logo
            }
            // className={movie.backdrop_path ? "" : "logo-img"}
            className="logo-img"
            alt={movie.title}
          />
        </div>
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
      <div className="watchlist-container ">
        <h1 className="page-title">Movie Explorer</h1>
        {movieEl}
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={data.movies}>{renderMovies}</Await>
      </Suspense>
    </>
  );
}
