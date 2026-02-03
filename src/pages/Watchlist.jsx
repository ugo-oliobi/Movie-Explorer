import { Await, defer, useLoaderData, useRevalidator } from "react-router-dom";
import { reqireAuth, db, collectionName } from "../utils";
import {
  query,
  where,
  doc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { Suspense } from "react";
import LoadingSpinner from "../component/LoadingSpinner";

export async function loader({ request }) {
  const user = await reqireAuth(request);

  const movieRef = collection(db, collectionName);
  const q = query(movieRef, where("uid", "==", user.uid));
  const moviePromise = getDocs(q).then((querySnapshot) => {
    if (querySnapshot.empty) {
      return { message: "Watchlist is empty, please add movies" };
    } else {
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    }
  });

  return defer({ user, movies: moviePromise });
}

export default function Watchlist() {
  const data = useLoaderData();
  const revalidator = useRevalidator();

  async function deleteMovie(id) {
    let userChoice = confirm("Are you sure you want to delete this movie?");

    if (userChoice) {
      await deleteDoc(doc(db, collectionName, id));
      revalidator.revalidate();
    }
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Await resolve={data.movies}>
        {(movie) =>
          Array.isArray(movie) ? (
            <div className="watchlist-container ">
              {movie.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="thumbnail"
                  />
                  <div className="movie-text">
                    <p>
                      <strong>Title: </strong>
                      {movie.title}
                    </p>
                  </div>
                  <div className="moviedetail-btn-container">
                    {movie.homepage && (
                      <div className="watchlist-btn">
                        <a href={movie.homepage} target="_blank">
                          Watch Now
                        </a>
                      </div>
                    )}
                    <button
                      onClick={() => deleteMovie(movie.id)}
                      className="watchlist-btn delete-btn"
                    >
                      Delete movie
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="watchlist-text">{movie.message}</p>
          )
        }
      </Await>
    </Suspense>
  );
}
