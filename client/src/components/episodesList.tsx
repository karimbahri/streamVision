export default function EpisodesList() {
  const seasonSelector = (event: any) => {
    console.log(event.target.value);
  };

  return (
    <div className="episode-list__wrapper">
      {/* <h1 className="episode-list__header">Episodes</h1> */}
      <select className="season-list" onChange={seasonSelector}>
        <option value="season_1"> season 1 </option>
        <option value="season_2"> season 2 </option>
        <option value="season_3"> season 3 </option>
        <option value="season_4"> season 4 </option>
      </select>

      <ul className="episode-list">
        <li className="episode-list__item">
          <a href="#">Episode 1</a>
        </li>
        <li className="episode-list__item">
          <a href="#">Episode 2</a>
        </li>
        <li className="episode-list__item">
          <a href="#">Episode 3</a>
        </li>
        <li className="episode-list__item">
          <a href="#">Episode 4</a>
        </li>
        <li className="episode-list__item">
          <a href="#">Episode 5</a>
        </li>
        <li className="episode-list__item">
          <a href="#">Episode 6</a>
        </li>
        <li className="episode-list__item">
          <a href="#">Episode 7</a>
        </li>
        <li className="episode-list__item">
          <a href="#">Episode 10</a>
        </li>
      </ul>
    </div>
  );
}
