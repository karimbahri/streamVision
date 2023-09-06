import * as Icon from "react-bootstrap-icons";
export default function MovieUploader() {
  return (
    <div className="movie-uploader">
      <label htmlFor="inputVideo-tag" className="inputVideo-label">
        <Icon.CloudArrowUpFill className={"cloud-icon"} />
        <h1>Drag and drop to upload video</h1>
        <h1>OR</h1>
        <h1 className="browse-btn">Browse video</h1>
        <input type="file" id="inputVideo-tag" accept="video/mp4" />
      </label>
    </div>
  );
}
