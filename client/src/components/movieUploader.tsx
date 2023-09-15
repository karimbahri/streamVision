import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import Notification from "./notification";
import Loader from "./loader";
import { setNotification } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

function MovieSelector(props: any) {
  const [video, setVideo] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [notificationClassValue, setNotificationClassValue] = useState("");
  const [notificationValue, setNotificationValue] = useState("");
  const setNotificationArgs = {
    notificationClassValue,
    setNotificationClassValue,
    notificationValue,
    setNotificationValue,
  };
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.token;
    if (token === "undefined") navigate("/");
    else {
      try {
        const { isAdmin }: { isAdmin: boolean } = jwt_decode(token);
        // if (!decode.isAdmin) navigate("/");
        if (!isAdmin) navigate("/");
      } catch (error) {
        console.error("Error decoding JWT:", error);
      }
    }
  }, []);

  const supaBase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  return (
    <div className="movie-uploader">
      <label htmlFor="inputVideo-tag" className="inputVideo-label">
        <Icon.CloudArrowUpFill className={"cloud-icon"} />
        <h1>Drag and drop to upload video</h1>
        <h1>OR</h1>
        <h1 className="browse-btn">Browse video</h1>
        <input
          type="file"
          id="inputVideo-tag"
          accept="video/mp4"
          onChange={(event) => {
            if (event.target.files) setVideo(event.target.files[0]);
          }}
        />
        <p>{video?.name}</p>
      </label>
      {isLoading && <Loader />}
      <a
        className="submit-btn"
        onClick={async () => {
          if (video) {
            setIsLoading(true);
            const videoTitle = `${uuidv4()}.mp4`;
            const { error, data } = await supaBase.storage
              .from("movies")
              .upload(videoTitle, video);
            console.log(videoTitle);
            if (error) {
              setNotificationArgs.notificationClassValue =
                "notification-appear notification-failure";
              setNotificationArgs.notificationValue = error.message;
              setNotification(setNotificationArgs);
              setIsLoading(false);
            } else {
              setIsLoading(false);
              props.setIsUploaded(true);
            }
          } else {
            setNotificationArgs.notificationClassValue =
              "notification-appear notification-failure";
            setNotificationArgs.notificationValue = "No video to upload!";
            setNotification(setNotificationArgs);
          }
        }}
      >
        UPLOAD
      </a>
      <Notification
        classValue={`${notificationClassValue} notification-top`}
        message={notificationValue}
      />
    </div>
  );
}

function MovieInfoSaver() {
  const [movieTitle, setMovieTitle] = useState("");
  const [category, setCategory] = useState("");
  const [movieThumb, setMovieThumb] = useState<File>();
  const [notificationClassValue, setNotificationClassValue] = useState("");
  const [notificationValue, setNotificationValue] = useState("");
  const setNotificationArgs = {
    notificationClassValue,
    setNotificationClassValue,
    notificationValue,
    setNotificationValue,
  };

  return (
    <div className="movieInfo-saver">
      <h1 className="movieInfo-saver__header">Upload Movie</h1>
      <form className="movieInfo-saver__form">
        <div className="input-field">
          <label htmlFor="movieTitle">Title</label>
          <input
            type="text"
            placeholder="Title"
            id="movieTitle"
            required
            onChange={(event) => setMovieTitle(event.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            required
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="movie">Movie</option>
            <option value="tv-serie">Tv serie</option>
            <option value="anime">Anime</option>
          </select>
        </div>
        <div className="input-field">
          <label>Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            id="thumbnail"
            required
            onChange={(event) => {
              if (event.target.files) setMovieThumb(event.target.files[0]);
            }}
          />
        </div>
        <a
          className="submit-btn"
          onClick={async () => {
            if (!movieTitle || !movieThumb || !category) {
              setNotificationArgs.notificationClassValue =
                "notification-appear notification-failure";
              setNotificationArgs.notificationValue =
                "Please fill all the fields";
              setNotification(setNotificationArgs);
            } else {
            }
          }}
        >
          Save
        </a>
      </form>
      <Notification
        classValue={notificationClassValue}
        message={notificationValue}
      />
    </div>
  );
}

export default function MovieUploader() {
  const [isUploaded, setIsUploaded] = useState(false);

  return !isUploaded ? (
    <MovieSelector setIsUploaded={setIsUploaded} />
  ) : (
    <MovieInfoSaver />
  );
}
