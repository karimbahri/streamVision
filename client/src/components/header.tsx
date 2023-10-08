import { useLazyQuery } from "@apollo/client";
import { GET_SEARCHED_MOVIES } from "../graphQl/queries";
import { Search } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const [getSearchedMovies, { loading, data }] =
    useLazyQuery(GET_SEARCHED_MOVIES);
  const [searchListClassName, setSearchListClassName] = useState("");
  const [isSearchInputFocus, setIsSearchInputFocus] = useState(false);
  const inputSearchRef = useRef<HTMLInputElement>(null);

  let searchedMovies: any = [];
  const navigate = useNavigate();

  useEffect(() => {
    // if (data?.getSearchedMovies) setSearchedMovie(data.getSearchedMovies);
    if (data) searchedMovies = data.getSearchedMovies;
    console.log(searchedMovies);

    if (!searchedMovies.length) setSearchListClassName("hide");
    if (searchedMovies.length && isSearchInputFocus)
      setSearchListClassName("show");
  }, [data, searchedMovies]);

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
          <Search
            className={"bi bi-search"}
            onClick={() => {
              if (inputSearchRef?.current?.value)
                navigate(`search?q=${inputSearchRef.current?.value}`);
            }}
          />
          <input
            placeholder="Search"
            type="text"
            id="search__input"
            className="search__input"
            ref={inputSearchRef}
            onChange={(event) => {
              getSearchedMovies({
                variables: { searchTerm: event.target.value, size: 5 },
              });
              setSearchListClassName("show");
            }}
            onBlur={() => {
              setIsSearchInputFocus(false);
              setSearchListClassName("hide");
              setTimeout(() => {
                searchedMovies = [];
              }, 300);
            }}
            onFocus={() => {
              setIsSearchInputFocus(true);
            }}
          ></input>
          <ul className={`search-list ${searchListClassName}`}>
            {data?.getSearchedMovies
              ? data.getSearchedMovies.map((movie: any) => (
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
