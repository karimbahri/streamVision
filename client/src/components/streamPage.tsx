import EpisodesList from "./episodesList";
import StreamPlayer from "./streamPlayer";
import { isLoggedIn } from "../utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_SPECIFIC_MOVIE } from "../graphQl/queries";

export default function StreamPage() {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const navigate = useNavigate();
  const movies = useQuery(GET_SPECIFIC_MOVIE, {
    variables: { thumbnail: videoId },
  });

  useEffect(() => {
    if (!isLoggedIn()) navigate("/login");

    console.log(videoId);
  }, []);

  return (
    <div className="stream-page">
      <h1 className="stream-page__header">Interstellar</h1>
      <StreamPlayer />
      <EpisodesList />
    </div>
  );
}
