import "../../node_modules/video-react/dist/video-react.css";
import { Player, BigPlayButton } from "video-react";

export default function StreamPlayer(props: any) {
  return (
    <div className="stream-player">
      <Player aspectRatio="16:9">
        <BigPlayButton position="center" />
        <source src={props.url} />
      </Player>
    </div>
  );
}
