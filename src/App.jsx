import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home, { loader as homepageLoader } from "./pages/Home";
import Movies, { loader as moviesLoader } from "./pages/Movies";
import About from "./pages/About";
import MovieDetails, {
  loader as movieDetailsLoader,
} from "./pages/MovieDetails";
import Error from "./component/Error";
import Watchlist, { loader as watchlistLoader } from "./pages/Watchlist";
import Popular, { loader as popularLoader } from "./pages/Popular";
import Layout from "./component/Layout";
import SearchPage, { loader as searchLoader } from "./pages/SearchPage";
import PageNotFound from "./component/PageNotFound";
import Login, {
  loader as loginLoader,
  action as loginAction,
} from "./component/Login";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" errorElement={<Error />} element={<Layout />}>
        <Route index loader={homepageLoader} element={<Home />} />
        <Route
          path=":id"
          loader={movieDetailsLoader}
          element={<MovieDetails />}
        />
        <Route path="movies" loader={moviesLoader} element={<Movies />} />
        <Route
          path="movies/:id"
          loader={movieDetailsLoader}
          element={<MovieDetails />}
        />
        <Route path="popular" loader={popularLoader} element={<Popular />} />
        <Route path="search" loader={searchLoader} element={<SearchPage />} />
        <Route
          path="search/:id"
          loader={movieDetailsLoader}
          element={<MovieDetails />}
        />
        <Route
          path="popular/:id"
          loader={movieDetailsLoader}
          element={<MovieDetails />}
        />
        <Route
          path="watchlist"
          loader={watchlistLoader}
          element={<Watchlist />}
        />
        <Route path="about" element={<About />} />
        <Route
          path="login"
          loader={loginLoader}
          action={loginAction}
          element={<Login />}
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>,
  ),
);
function App() {
  return (
    <>
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
      <ToastContainer />
    </>
  );
}

export default App;
