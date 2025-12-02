import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import userImage from "../assets/image/user.svg";
import searchIcon from "../assets/image/search-icon.svg";
export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const styles = {
    fontWeight: "bold",
    color: "black",
  };

  useEffect(() => {
    function handleClickOnPage(event) {
      console.log(event.target.closest(".nav-list"));
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        if (event.target.closest(".nav-list") === null) {
          setIsOpen(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOnPage);
    console.log("ugo");
    return () => document.removeEventListener("mousedown", handleClickOnPage);
  }, []);
  console.log(menuRef.current);
  return (
    <div className="menu-container">
      <button
        ref={menuRef}
        className="menu-toggle"
        onClick={() => setIsOpen((preState) => !preState)}
      >
        ☰
      </button>
      <div className="search-container">
        <input className="search-input" />
        <div className="searchbox">
          <img src={searchIcon} />
        </div>
      </div>
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
        <img src={userImage} alt="user image" />
      </div>
    </div>
  );
}
