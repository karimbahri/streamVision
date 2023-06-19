import "../../node_modules/video-react/dist/video-react.css";
import { Player, BigPlayButton } from "video-react";

export default function StreamPlayer() {
  return (
    <div className="stream-player">
      <Player
      // ref={(player) => {
      //   this.player = player;
      // }}
      >
        <BigPlayButton position="center" />
        <source src="/assets/video-preview.mp4" />
      </Player>
    </div>
  );
}
