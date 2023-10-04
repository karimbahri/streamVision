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

  useEffect(() => {
    if (!isLoggedIn()) navigate("/login");
  }, []);

  return loading ? (
    <HomepageLoader />
  ) : (
    <div className="stream-page">
      <h1 className="stream-page__header">{data.getSpecificMovie.title}</h1>
      <StreamPlayer
        url={
          import.meta.env.VITE_CDN_URL +
          "/movies/" +
          data.getSpecificMovie.content
        }
      />
      <EpisodesList />
    </div>
  );
}
