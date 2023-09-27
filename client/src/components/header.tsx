import { Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h1 className="header__logo">StreamVision</h1>
      <input
        type="checkbox"
        className="navbar__checkbox navbar__checkbox"
        id="navbar__checkbox"
      />
      <div className="header__content">
        <div className="header__search">
          {/* <i className="bi bi-search"></i> */}
          <Search className={"bi bi-search"} />
          <input
            placeholder="Search"
            type="text"
            id="search__input"
            className="search__input"
          ></input>
        </div>
        <ul className="header__list">
          <li className="header__item">
            <Link to="/movies">Movies</Link>
          </li>
          <li className="header__item">
            <Link to="/series">Tv series</Link>
          </li>
          <li className="header__item">
            <Link to="/animes">Animes</Link>
          </li>
          <li className="header__item">
            <Link to="/">Trending</Link>
          </li>
        </ul>
      </div>
      <label htmlFor="navbar__checkbox" className="navbar__toggle">
        <span className="bar bar1"></span>
        <span className="bar bar2"></span>
        <span className="bar bar3"></span>
        <span className="bar bar4"></span>
      </label>
    </header>
  );
}
