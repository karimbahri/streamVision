import "../../node_modules/video-react/dist/video-react.css";
import { Player, BigPlayButton } from "video-react";

export default function StreamPlayer(props: any) {
  return (
    <div className="stream-player">
      <div className="video-wrapper">
        <Player
          // ref={(player) => {
          //   this.player = player;
          // }}
          // fluid={false}
          aspectRatio="16:9"
        >
          <BigPlayButton position="center" />
          <source src={props.url} />
        </Player>
      </div>
    </div>
  );
}
