import { useLazyQuery } from "@apollo/client";
import { GET_SEARCHED_MOVIES } from "../graphQl/queries";
import { Search } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [getSearchedMovies, { loading, data }] =
    useLazyQuery(GET_SEARCHED_MOVIES);
  const [searchedMovies, setSearchedMovie] = useState([]);
  const [searchListClassName, setSearchListClassName] = useState("hide");

  useEffect(() => {
    if (data) setSearchedMovie(data.getSearchedMovies);
    if (!searchedMovies) setSearchListClassName("hide");
  }, [data]);

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
            onChange={(event) => {
              getSearchedMovies({
                variables: { searchTerm: event.target.value, size: 5 },
              });
              setSearchListClassName("show");
              // if (data) setSearchedMovie(data.getSearchedMovies);
            }}
            onBlur={() => {
              setSearchListClassName("hide");
              setTimeout(() => {
                setSearchedMovie([]);
              }, 300);
            }}
          ></input>
          <ul className={`search-list ${searchListClassName}`}>
            {/* <li>
              <Link to="bb">Breaking bad</Link>
            </li>
            <li>
              <Link to="bb">Peaky blinders</Link>
            </li>
            <li>
              <Link to="bb">Fargo</Link>
            </li>
            <li>
              <Link to="bb">The end of the fu**g world</Link>
            </li> */}
            {searchedMovies
              ? searchedMovies.map((movie: any) => (
                  <li>
                    <Link to={`/watch?v=${movie.thumbnail.slice(0, -4)}`}>
                      {movie.title}
                    </Link>
                  </li>
                ))
              : undefined}
          </ul>
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
