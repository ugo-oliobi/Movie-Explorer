import { useEffect, useState } from "react";
// import parentalControl from "../assets/image/logo.png";
import parentalControl from "../assets/parentalcontrol.svg";

import { useParams } from "react-router-dom";
import { getGenreNames, getReleasedDate } from "../utils";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}
`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
      });
  }, [id]);
  console.log(movie);
  if (!movie) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="movie-details-container ">
      {movie ? (
        <div className="movie-details">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={movie.title}
          />
          <div className="movie-description">
            <p>
              <span>{movie.title}</span>
            </p>
            <p>
              <strong>Status: </strong>
              {movie.status}
            </p>
            <p>
              <strong>Realeased Date: </strong>
              {getReleasedDate(movie.release_date)}
            </p>
            <p>
              <strong>Genre: </strong>
              {getGenreNames(movie.genres)}
            </p>
            {movie.adult && <img src={parentalControl} />}
            <p>
              <strong>Overview: </strong>
              {movie.overview}
            </p>
            {movie.homepage && (
              <div className="watch_on_netflix">
                <a href={movie.homepage} target="_blank">
                  Watch Now
                </a>
              </div>
            )}
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
