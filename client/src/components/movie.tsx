import { Link } from "react-router-dom";

export default function Movie(props: any) {
  console.log(import.meta.env.VITE_CDN_URL + "thumbnails/" + props.thumb);
  return (
    <div className="element">
      <img
        src={import.meta.env.VITE_CDN_URL + "thumbnails/" + props.thumb}
        alt="thumb"
        className="movie-thumb"
      />
      <h1 className="movie-title">{props.title}</h1>
      <Link className="movie-btn" to={`/watch?v=${props.thumb}`}>
        Watch
      </Link>
    </div>
  );
}
