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
