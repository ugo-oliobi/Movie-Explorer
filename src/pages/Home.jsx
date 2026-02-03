import { useLoaderData, defer, Await, Link } from "react-router-dom";
import Slider from "../component/Slider";
import { getYear, shortenOverview, getMovies } from "../utils";
import { Suspense } from "react";
import LoadingSpinner from "../component/loadingSpinner";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}
`;

export function loader() {
  return defer({ movies: getMovies(url) });
}
export default function Home() {
  const data = useLoaderData();

  function loadMovies(movieData) {
    const movieElements = movieData.map((movie) => (
      <Link to={`${movie.id}`} className="movie-card" key={movie.id}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
          className="thumbnail"
        />
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
      <>
        <section className="homepage-movie-container">
          <Slider movie={movieData} />;
        </section>
        <section className="movies-container">
          <h2 className="upcoming">Upcoming...</h2>
          {movieElements}
        </section>
      </>
    );
  }

  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Await resolve={data.movies}>{loadMovies}</Await>
      </Suspense>
    </>
  );
}
