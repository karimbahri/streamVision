import { useQuery } from "@apollo/client";
import { GET_SEARCHED_MOVIES } from "../graphQl/queries";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Movie from "./movie";
import HomepageLoader from "./homepageLoader";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");
  const { data } = useQuery(GET_SEARCHED_MOVIES, {
    variables: { searchTerm, size: 25 },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (data && data.getSearchedMovies.length) setIsLoaded(true);
    else setIsLoaded(false);
    console.log(data);
  }, [data, searchTerm]);

  return isLoaded ? (
    <>
      <h1 className={"movies-__header"}>Search results: {searchTerm}</h1>
      <div className={"movies-grid-container"}>
        {data?.getSearchedMovies.map((movie: any) => (
          <Movie
            key={movie.thumbnail}
            thumb={movie.thumbnail}
            title={movie.title}
          />
        ))}
      </div>
    </>
  ) : (
    <HomepageLoader />
  );
}
