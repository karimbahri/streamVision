import * as Icon from "react-bootstrap-icons";

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
          <Icon.Search className={"bi bi-search"} />
          <input
            placeholder="Search"
            type="text"
            id="search__input"
            className="search__input"
          ></input>
        </div>
        <ul className="header__list">
          <li className="header__item">
            <a href="#">Movies</a>
          </li>
          <li className="header__item">
            <a href="#">Tv series</a>
          </li>
          <li className="header__item">
            <a href="#">Animes</a>
          </li>
          <li className="header__item">
            <a href="#">Trending</a>
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
