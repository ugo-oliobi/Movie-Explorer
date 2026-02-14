import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
  useNavigate,
} from "react-router-dom";
import logo from "../assets/image/movieLogo.svg";
import parentalControl from "../assets/parentalcontrol.svg";
import {
  collection,
  doc,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { getGenreNames, getMovieDetails, getReleasedDate } from "../utils";
import { Suspense } from "react";
import LoadingSpinner from "../component/LoadingSpinner";
import { auth, collectionName, db } from "../utils";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export function loader({ params, request }) {
  const pathname = new URL(request.url).pathname;

  const url = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}
`;

  return defer({ movie: getMovieDetails(url), pathname });
}

export default function MovieDetails() {
  const movieData = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = movieData.pathname;

  function handleClick() {
    const user = auth.currentUser;
    if (!user) {
      navigate(`/login?pathname=${pathname}`);
    } else {
      addDocToDb(user);
    }
  }

  async function addDocToDb(user) {
    try {
      const data = await movieData.movie;
      const q = query(
        collection(db, collectionName),
        where("uid", "==", user.uid),
        where("title", "==", data.title),
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        // alert("Movie already in watchlist!");
        toast.warning("Movie already in watchlist!");
        return;
      }

      await addDoc(collection(db, collectionName), {
        title: data.title,
        image: `https://image.tmdb.org/t/p/w500${data.backdrop_path}`,
        uid: user.uid,
        homepage: data.homepage,
      });
      // alert("Movie added to watchlist!");
      toast.success("Movie added to watchlist!");
    } catch (error) {
      toast.error(`Movie not added: ${error}`);
      console.error("Movie not added:", error);
    }
  }

  const goto = location.state?.search || "";

  function renderMovieDetails(movie) {
    return (
      <div className="movie-details-container ">
        <div className="movie-details">
          <Link to={`..${goto}`} relative="path">
            ⬅ back to movies
          </Link>
          {/* <BackButton /> */}
          <img
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : logo
            }
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
              <strong>Released Date: </strong>
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
            <div className="moviedetail-btn-container">
              {movie.homepage && (
                <button
                  className="btn movie-detail-btn"
                  onClick={() => {
                    window.open(movie.homepage, "_blank");
                  }}
                >
                  Watch Now
                </button>
              )}
              <button onClick={handleClick} className="btn movie-detail-btn">
                Add to Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={movieData.movie}>{renderMovieDetails}</Await>
    </Suspense>
  );
}
