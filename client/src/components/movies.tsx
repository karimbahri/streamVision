import { useQuery } from "@apollo/client";
import { GET_LATEST_MOVIES_BY_CATEGORY } from "../graphQl/queries";
import { useEffect, useState } from "react";
import Movie from "./movie";

export default function Movies(props: any) {
  const { data } = useQuery(GET_LATEST_MOVIES_BY_CATEGORY, {
    variables: { category: props.category, size: 25 },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (data && data.getLatestMoviesByCategory.length) setIsLoaded(true);
    console.log(data);
  }, [data]);

  return isLoaded ? (
    <>
      <h1 className={"movies-__header"}>{props.section}</h1>
      <div className={"movies-grid-container"}>
        {data.getLatestMoviesByCategory.map((movie: any) => (
          <Movie key={movie.id} />
        ))}
        {/* <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie /> */}
      </div>
    </>
  ) : (
    <></>
  );
}
