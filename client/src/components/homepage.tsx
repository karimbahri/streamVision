import { useQuery } from "@apollo/client";
import {
  GET_LATEST_ALL,
  GET_LATEST_MOVIES_BY_CATEGORY,
} from "../graphQl/queries";
import MoviesSlider from "./moviesSlider";
import { useEffect, useState } from "react";

const HomePage = () => {
  const latestAll = useQuery(GET_LATEST_ALL);
  const movies = useQuery(GET_LATEST_MOVIES_BY_CATEGORY, {
    variables: { category: "movie" },
  });
  const tvShows = useQuery(GET_LATEST_MOVIES_BY_CATEGORY, {
    variables: { category: "tv-serie" },
  });
  const animes = useQuery(GET_LATEST_MOVIES_BY_CATEGORY, {
    variables: { category: "anime" },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (latestAll.data && movies.data && tvShows.data && animes.data)
      setIsLoaded(true);
  }, [latestAll, movies, tvShows, animes]);

  return (
    <div className="homepage">
      {!isLoaded ? undefined : (
        <MoviesSlider data={latestAll.data} section={"Trending"} />
      )}
    </div>
  );
};

export default HomePage;
