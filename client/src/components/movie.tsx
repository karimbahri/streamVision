import { Link } from "react-router-dom";

export default function Movie() {
  return (
    <div className="element">
      <img
        src="./assets/interstellar.jpg"
        alt="thumb"
        className="movie-thumb"
      />
      <h1 className="movie-title">Interstellar</h1>
      <button className="movie-btn">
        <Link to={"/watch"}>Watch</Link>
      </button>
    </div>
  );
}
