import { useQuery } from "@apollo/client";
import {
  GET_LATEST_ALL,
  GET_LATEST_MOVIES_BY_CATEGORY,
} from "../graphQl/queries";
import MoviesSlider from "./moviesSlider";
import { useEffect, useState } from "react";
import HomepageLoader from "./homepageLoader";

const HomePage = () => {
  const latestAll = useQuery(GET_LATEST_ALL);
  const movies = useQuery(GET_LATEST_MOVIES_BY_CATEGORY, {
    variables: { category: "movie", size: 15 },
  });
  const tvShows = useQuery(GET_LATEST_MOVIES_BY_CATEGORY, {
    variables: { category: "tv-serie", size: 15 },
  });
  const animes = useQuery(GET_LATEST_MOVIES_BY_CATEGORY, {
    variables: { category: "anime", size: 15 },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (latestAll.data && movies.data && tvShows.data && animes.data)
      setIsLoaded(true);
  }, [latestAll, movies, tvShows, animes]);

  return (
    <div className="homepage">
      {!isLoaded ? (
        <HomepageLoader />
      ) : (
        <>
          <MoviesSlider
            data={latestAll.data.getLatestAll}
            section={"Trending"}
          />
          <MoviesSlider
            data={movies.data.getLatestMoviesByCategory}
            section={"Movies"}
          />
          <MoviesSlider
            data={tvShows.data.getLatestMoviesByCategory}
            section={"Tv Show"}
          />
          <MoviesSlider
            data={animes.data.getLatestMoviesByCategory}
            section={"Animes"}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
