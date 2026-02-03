import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authSignout } from "../utils";
import DisplayName from "./DisplayName";
import userImage from "../assets/image/user.svg";
import searchIcon from "../assets/image/search-icon.svg";
import { auth } from "../utils";
export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // const [searchParams, setSearchParams] = useSearchParams();

  // console.log(searchParams.get("searchInput"));
  const menuRef = useRef(null);
  const signRef = useRef(null);
  const styles = {
    fontWeight: "bold",
    color: "black",
  };

  useEffect(() => {
    function handleClickOnPage(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (event.target.closest(".nav-list") === null) {
          setIsOpen(false);
        }
      }
      if (signRef.current && !signRef.current.contains(event.target)) {
        if (event.target.closest(".userImage-container") === null) {
          setLoginIsOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOnPage);

    return () => document.removeEventListener("mousedown", handleClickOnPage);
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/search?query=${query}`);
  }
  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div className="menu-container">
      <button
        ref={menuRef}
        className="menu-toggle"
        onClick={() => setIsOpen((preState) => !preState)}
      >
        ☰
      </button>
      <form
        id="search-form"
        onSubmit={handleSubmit}
        className="search-container"
      >
        <input
          id="search"
          type="text"
          value={query}
          onChange={handleChange}
          className="search-input"
          placeholder="Search"
        />
        <button className="searchbox">
          <img src={searchIcon} />
        </button>
      </form>
      <ul className={`nav-list ${isOpen ? "open" : ""}`}>
        <NavLink
          style={({ isActive }) => (isActive ? styles : null)}
          to="/"
          onClick={() => setIsOpen(false)}
        >
          <li>Home</li>
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? styles : null)}
          to="movies"
          onClick={() => setIsOpen(false)}
        >
          <li>Movies</li>
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? styles : null)}
          to="popular"
          onClick={() => setIsOpen(false)}
        >
          <li>Popular</li>
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? styles : null)}
          to="watchlist"
          onClick={() => setIsOpen(false)}
        >
          <li>Watchlist</li>
        </NavLink>

        <NavLink
          style={({ isActive }) => (isActive ? styles : null)}
          to="about"
          onClick={() => setIsOpen(false)}
        >
          <li>About</li>
        </NavLink>
      </ul>
      <div className="userImage-container">
        <img
          src={userImage}
          alt="user image"
          ref={signRef}
          onClick={() => {
            setLoginIsOpen((prev) => !prev);
          }}
        />
        <div className={`login_user ${loginIsOpen ? "loginIsOpen" : ""}`}>
          {auth?.currentUser ? (
            <DisplayName />
          ) : (
            <>
              <button
                className="register"
                onClick={() => {
                  navigate("/login");
                  setLoginIsOpen(false);
                }}
              >
                Sign in
              </button>
              {auth?.currentUser && <div className="register-line"></div>}
            </>
          )}
          {auth?.currentUser && (
            <button
              className="register"
              onClick={() => {
                navigate("/login");
                authSignout();
                setLoginIsOpen(false);
              }}
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
