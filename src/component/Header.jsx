import Menu from "./Menu";
import logo from "../assets/image/logo.png";

function Header() {
  return (
    <header>
      <img src={logo} alt="movie eplorer logo" />
      <nav className="navbar">
        <Menu />
      </nav>
    </header>
  );
}

export default Header;

//  <NavLink style={({ isActive }) => (isActive ? styles : null)} to="/">
//           Home
//         </NavLink>
//         <NavLink
//           style={({ isActive }) => (isActive ? styles : null)}
//           to="movies"
//         >
//           Movies
//         </NavLink>
//         <NavLink
//           style={({ isActive }) => (isActive ? styles : null)}
//           to="popular"
//         >
//           Popular
//         </NavLink>
//         <NavLink
//           style={({ isActive }) => (isActive ? styles : null)}
//           to="watchlist"
//         >
//           Watchlist
//         </NavLink>
//         <NavLink
//           style={({ isActive }) => (isActive ? styles : null)}
//           to="about"
//         >
//           About
//         </NavLink>
