import { NavLink } from "react-router-dom";
import logo from "../assets/image/logo.png";

function Header() {
  const styles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "black",
  };
  return (
    <header>
      <img src={logo} />
      <nav className="navbar">
        <NavLink style={({ isActive }) => (isActive ? styles : null)} to="/">
          Home
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? styles : null)}
          to="movies"
        >
          Movies
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? styles : null)}
          to="popular"
        >
          Popular
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? styles : null)}
          to="watchlist"
        >
          Watchlist
        </NavLink>
        <NavLink
          style={({ isActive }) => (isActive ? styles : null)}
          to="about"
        >
          About
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
