import { Link, useLocation } from "react-router-dom";

export default function EpisodesList(props: any) {
  const seasonSelector = (event: any) => {
    console.log(event.target.value);
  };
  const { pathname, search } = useLocation();
  const options = [];
  const episodes = [];

  for (let i = 1; i <= props.seasons; i++)
    options.push(<option value={`season_${i}`}> {`Season ${i}`} </option>);

  for (let j = 1; j <= props.episodes; j++)
    episodes.push(
      <li className="episode-list__item">
        <Link
          to={
            search.includes("episode=")
              ? `${pathname}${search}`.replace(/&episode=\d+/g, `&episode=${j}`)
              : `${pathname}${search}&episode=${j}`
          }
        >{`Episode ${j}`}</Link>
      </li>
    );
  return (
    <div className="episode-list__wrapper">
      {options.length && (
        <select className="season-list" onChange={seasonSelector}>
          {options}
        </select>
      )}

      <ul className="episode-list">{episodes}</ul>
    </div>
  );
}
