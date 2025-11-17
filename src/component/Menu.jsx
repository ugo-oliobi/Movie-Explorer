import { useState } from "react";
import { NavLink } from "react-router-dom";
export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const styles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "black",
  };
  console.log(isOpen);
  return (
    <div className="menu-container">
      <button
        className="menu-toggle"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        ☰ Menu
      </button>
      <ul className={`nav-list ${isOpen ? "open" : ""}`}>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="/"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="movies"
            onClick={() => setIsOpen(false)}
          >
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="popular"
            onClick={() => setIsOpen(false)}
          >
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="watchlist"
            onClick={() => setIsOpen(false)}
          >
            Watchlist
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="about"
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
