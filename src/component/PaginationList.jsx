import { useSearchParams, useRevalidator } from "react-router-dom";
import { collectionName, db } from "../utils";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function PaginationList({ movies }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const revalidator = useRevalidator();
  const recordsPerPage = 6;
  const records = movies.slice(
    (page - 1) * recordsPerPage,
    page * recordsPerPage,
  );

  const numberOfPages = Math.ceil(movies.length / recordsPerPage);
  const numbers = [...Array(numberOfPages + 1).keys()].slice(1);

  function deleteMovie(id) {
    toast(
      ({ closeToast }) => (
        <div className="toast-container">
          <p className="toast-text">
            Are you sure you want to delete this movie
          </p>
          <button
            className="btn toast-btn"
            onClick={async () => {
              await deleteDoc(doc(db, collectionName, id));
              revalidator.revalidate();

              const newMovies = movies.filter((m) => m.id !== id);
              const newNumberOfPages = Math.ceil(
                newMovies.length / recordsPerPage,
              );

              if (page > newNumberOfPages) {
                setSearchParams({ page: newNumberOfPages });
              } else if (
                newMovies.slice(
                  (page - 1) * recordsPerPage,
                  page * recordsPerPage,
                ).length === 0 &&
                page > 1
              ) {
                setSearchParams({ page: page - 1 });
              }
              closeToast();
              toast.success("movie successfully deleted from your watchlist");
            }}
          >
            Yes
          </button>
          <button className="btn toast-btn" onClick={closeToast}>
            Cancel
          </button>
        </div>
      ),
      { autoClose: false },
    );
  }

  function gotoPrevPage() {
    if (page > 1) {
      setSearchParams({ page: page - 1 });
    }
  }
  function gotoNextPage() {
    if (page < numberOfPages) {
      setSearchParams({ page: page + 1 });
    }
  }
  const movieElements = records.map((movie) => (
    <div key={movie.id} className="movie-card watchlist-card">
      <img src={movie.image} alt={movie.title} className="thumbnail" />
      <div className="movie-text">
        <p>
          <strong>Title: </strong>
          {movie.title}
        </p>
      </div>
      <div className="moviedetail-btn-container">
        {movie.homepage && (
          <button
            className="watchlist-btn"
            onClick={() => window.open(movie.homepage, "_blank")}
          >
            Watch Now
          </button>
        )}
        <button
          onClick={() => deleteMovie(movie.id)}
          className="watchlist-btn delete-btn"
        >
          Delete movie
        </button>
      </div>
    </div>
  ));

  return (
    <div className="watchlist-layout">
      <div className="watchlist-movie-container">
        <div className="watchlist-container">{movieElements}</div>
      </div>
      {movies.length > recordsPerPage && (
        <div className="pag-container">
          <ul className="pagination-link">
            <li>
              <button
                className="pagination-btn"
                onClick={gotoPrevPage}
                aria-label="Previous page"
                disabled={page === 1}
              >
                &lt;&lt;
              </button>
            </li>
            {numbers.map((el, i) => (
              <li key={i}>
                <button
                  className={`pagination-btn ${el === page ? "active-number" : ""}`}
                  onClick={() => {
                    setSearchParams({ page: el });
                  }}
                  aria-label={`go to page ${el}`}
                >
                  {el}
                </button>
              </li>
            ))}
            <li>
              <button
                aria-label="Next page"
                onClick={gotoNextPage}
                className="pagination-btn"
                disabled={page === numberOfPages}
              >
                &gt;&gt;
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
