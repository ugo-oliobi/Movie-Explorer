import { useEffect, useMemo, useState } from "react";
const writeUps = [
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
    <>
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
    </>
  );
}
