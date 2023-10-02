import EpisodesList from "./episodesList";
import StreamPlayer from "./streamPlayer";
import { isLoggedIn } from "../utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_SPECIFIC_MOVIE } from "../graphQl/queries";
import HomepageLoader from "./homepageLoader";

export default function StreamPage() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_SPECIFIC_MOVIE, {
    variables: { thumbnail: videoId },
  });
  const [movie, setMovie] = useState<any>({});

  useEffect(() => {
    if (!isLoggedIn()) navigate("/login");

    if (data) setMovie(data.getSpecificMovie);
    console.log(data);
  }, [data]);

  return loading ? (
    <HomepageLoader />
  ) : (
    <div className="stream-page">
      <h1 className="stream-page__header">{data.getSpecificMovie.title}</h1>
      <StreamPlayer />
      <EpisodesList />
    </div>
  );
}
