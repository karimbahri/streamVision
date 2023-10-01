import { useQuery } from "@apollo/client";
import { GET_LATEST_MOVIES_BY_CATEGORY } from "../graphQl/queries";
import { useEffect, useState } from "react";
import Movie from "./movie";
import HomepageLoader from "./homepageLoader";

export default function Movies(props: any) {
  const { data } = useQuery(GET_LATEST_MOVIES_BY_CATEGORY, {
    variables: { category: props.category, size: 25 },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (data && data.getLatestMoviesByCategory.length) setIsLoaded(true);
  }, [data]);

  return isLoaded ? (
    <>
      <h1 className={"movies-__header"}>{props.section}</h1>
      <div className={"movies-grid-container"}>
        {data.getLatestMoviesByCategory.map((movie: any) => (
          <Movie key={movie.id} />
        ))}
      </div>
    </>
  ) : (
    <HomepageLoader />
  );
}
