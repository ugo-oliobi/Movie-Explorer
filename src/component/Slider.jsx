import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
const writeUps = [
  "Explore the world of movies like never before.",
  "From cult classics to the latest blockbusters — all in one place.",
  "Your next favorite film is just a scroll away.",
  "Uncover hidden gems and timeless masterpieces.",
  "Track your journey through film — rate, review, and remember.",
  "Join a community of movie lovers. Discover. Share. Celebrate.",
  "Explore the world of movies like never before.",
  "From cult classics to the latest blockbusters — all in one place.",
  "Your next favorite film is just a scroll away.",
  "Uncover hidden gems and timeless masterpieces.",
  "Track your journey through film — rate, review, and remember.",
  "Join a community of movie lovers. Discover. Share. Celebrate.",
];

export default function Slider({ movie }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const movieEl = useMemo(() => {
    return movie
      .map(({ poster_path, title, overview, id }) => {
        return {
          image: `https://image.tmdb.org/t/p/w500${poster_path}`,
          title,
          overview,
          id,
        };
      })
      .slice(0, 12);
  }, [movie]);

  // Auto-slide every 10 seconds
  useEffect(() => {
    if (!movieEl.length) return;

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
  if (!movieEl.length) return null;

  return (
    <div className="slider">
      <section className="slider-section_1">
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
      <section className="slider-section_2 ">
        {movieEl.map((movie, i) => (
          <Link to={`${movie.id}`} key={i}>
            <img
              className="slider-section_2_img"
              src={movie.image}
              alt={movie.title}
            />
          </Link>
        ))}
      </section>
    </div>
  );
}
