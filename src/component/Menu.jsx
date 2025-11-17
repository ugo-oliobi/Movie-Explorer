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
          <NavLink style={({ isActive }) => (isActive ? styles : null)} to="/">
            Home
          </NavLink>
        </li>
        <li>
          {" "}
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="movies"
          >
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="popular"
          >
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="watchlist"
          >
            Watchlist
          </NavLink>
        </li>
        <li>
          <NavLink
            style={({ isActive }) => (isActive ? styles : null)}
            to="about"
          >
            About
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
