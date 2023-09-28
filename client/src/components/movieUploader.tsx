import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import client from "../apollo-client";
import { CloudArrowUpFill } from "react-bootstrap-icons";
import Notification from "./notification";
import Loader from "./loader";
import { isAdmin, setNotification } from "../utils";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { DELETE_MOVIE_MUTATION, SAVESHOW_MUTATION } from "../graphQl/mutations";

function MovieSelector(props: any) {
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
    if (!isAdmin()) navigate("/");
  }, []);

  return (
    <div className="movie-uploader">
      <label htmlFor="inputVideo-tag" className="inputVideo-label">
        <CloudArrowUpFill className={"cloud-icon"} />
        <h1>Drag and drop to upload video</h1>
        <h1>OR</h1>
        <h1 className="browse-btn">Browse video</h1>
        <input
          type="file"
          id="inputVideo-tag"
          accept="video/mp4"
          onChange={(event) => {
            if (event.target.files) props.setVideo(event.target.files[0]);
          }}
        />
        <p>{props.video?.name}</p>
      </label>
      <a
        className="submit-btn"
        onClick={async () => {
          if (props.video) {
            props.setIsUploaded(true);
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

function MovieInfoSaver(props: any) {
  const [movieTitle, setMovieTitle] = useState("");
  const [category, setCategory] = useState("movie");
  const [movieThumb, setMovieThumb] = useState<File>();
  const [notificationClassValue, setNotificationClassValue] = useState("");
  const [notificationValue, setNotificationValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const setNotificationArgs = {
    notificationClassValue,
    setNotificationClassValue,
    notificationValue,
    setNotificationValue,
  };

  const supaBase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_KEY
  );

  const navigate = useNavigate();

  const [saveShow /*, { error }*/] = useMutation(SAVESHOW_MUTATION, {
    onCompleted: (data) => {
      console.log("data : ", data);
      client.resetStore();
    },
  });

  const [deleteMovie, { error }] = useMutation(DELETE_MOVIE_MUTATION, {
    onCompleted: (data) => {
      console.log("data : ", data);
      client.resetStore();
    },
    onError: (error) => {
      setNotificationArgs.notificationClassValue =
        "notification-appear notification-failure";
      setNotificationArgs.notificationValue = error.message;
      setNotification(setNotificationArgs);
    },
  });

  const supaBaseUpload = (buckets: string, title: string, file: any) => {
    return new Promise(async (resolve, reject) => {
      const { data, error } = await supaBase.storage
        .from(buckets)
        .upload(title, file);
      if (data) resolve(data);
      if (error) reject(error);
    });
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
              console.log(category);
              setNotificationArgs.notificationClassValue =
                "notification-appear notification-failure";
              setNotificationArgs.notificationValue =
                "Please fill all the fields";
              setNotification(setNotificationArgs);
            } else {
              const videoTitle = `${uuidv4()}.mp4`;
              const thumbTitle = `${uuidv4()}.png`;
              setIsLoading(true);
              const results = await Promise.all([
                supaBaseUpload("movies", videoTitle, props.video),
                supaBaseUpload("thumbnails", thumbTitle, movieThumb),
                saveShow({
                  variables: {
                    content: videoTitle,
                    thumbnail: thumbTitle,
                    title: movieTitle,
                    category,
                  },
                }),
              ])
                .then(() => {
                  setIsLoading(false);
                  navigate("/");
                })
                .catch((error) => {
                  deleteMovie({ variables: { content: videoTitle } });
                  setIsLoading(false);
                  setNotificationArgs.notificationClassValue =
                    "notification-appear notification-failure";
                  setNotificationArgs.notificationValue = error.message;
                  setNotification(setNotificationArgs);
                });
              console.log(results);
            }
          }}
        >
          Save
        </a>
      </form>
      {isLoading && <Loader />}
      <Notification
        classValue={notificationClassValue}
        message={notificationValue}
      />
    </div>
  );
}

export default function MovieUploader() {
  const [video, setVideo] = useState<File>();
  const [isUploaded, setIsUploaded] = useState(false);

  return !isUploaded ? (
    <MovieSelector
      setIsUploaded={setIsUploaded}
      setVideo={setVideo}
      video={video}
    />
  ) : (
    <MovieInfoSaver setVideo={setVideo} video={video} />
  );
}
