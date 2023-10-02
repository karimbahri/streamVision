import EpisodesList from "./episodesList";
import StreamPlayer from "./streamPlayer";
import { isLoggedIn } from "../utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function StreamPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) navigate("/login");

    console.log(searchParams);
  }, []);

  return (
    <div className="stream-page">
      <h1 className="stream-page__header">Interstellar</h1>
      <StreamPlayer />
      <EpisodesList />
    </div>
  );
}
