import { useEffect, useMemo, useState } from "react";
import { getYear, shortenOverview } from "../utils";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const writeUps = [
  "Explore the world of movies like never before.",
  "From cult classics to the latest blockbusters — all in one place.",
  "Your next favorite film is just a scroll away.",
  "Uncover hidden gems and timeless masterpieces.",
  "Track your journey through film — rate, review, and remember.",
  "Join a community of movie lovers. Discover. Share. Celebrate.",
];

export default function Home() {
  const [movie, setMovie] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}
`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data.results);
      });
  }, []);

  const movieEl = useMemo(() => {
    return movie
      .map(({ poster_path, title, overview }) => {
        return {
          image: `https://image.tmdb.org/t/p/w500${poster_path}`,
          title,
          overview,
        };
      })
      .slice(0, 6);
  }, [movie]);

  // Auto-slide every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      gotoNextSlide();
    }, 10000);

    return () => clearInterval(timer);
  }, [movieEl.length]);

  function gotoPreviousSlide() {
    setCurrentIndex((prevSlide) => {
      return prevSlide === 0 ? movieEl.length - 1 : prevSlide - 1;
    });
  }

  function gotoNextSlide() {
    setCurrentIndex((prevSlide) => {
      return prevSlide === movieEl.length - 1 ? 0 : prevSlide + 1;
    });
  }
  if (movieEl.length === 0) return <h2>Loading upcoming movies...</h2>;

  return (
    <>
      <section className="homepage-movie-container">
        <h1 className="write-ups">{writeUps[currentIndex]}</h1>
        <div className="homepage-movie-image-container">
          <button aria-label="Previous Slide" onClick={gotoPreviousSlide}>
            ←
          </button>

          <img
            src={movieEl[currentIndex].image}
            alt={movieEl[currentIndex].title}
          />

          <button aria-label="Next Slide" onClick={gotoNextSlide}>
            →
          </button>
        </div>
      </section>
      <section className="movies-container">
        {movie.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
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
            <button
              className="btn"
              onClick={() => {
                console.log("clicked");
              }}
            >
              Add to Watchlist
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
