import Header from "./components/header";
import "./styles/styles.css";
// import "./styles/styles.scss";

import Movies from "./components/movies";
import MoviesSlider from "./components/moviesSlider";
import StreamPage from "./components/streamPage";
import Login from "./components/logIn";
import Reset from "./components/reset";
import SignUp from "./components/signup";
import { Routes, Route } from "react-router-dom";
import { isAdmin, isLoggedIn as isLoggedInFx } from "./utils";
// import * as Icon from "react-bootstrap-icons";
import { PersonCircle, CloudArrowUp } from "react-bootstrap-icons";
// import { ApolloProvider } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import client from "./apollo-client";
import { useState } from "react";
import ResetPassword from "./components/resetPassword";
import CodeVerification from "./components/codeVerification";
import MovieUploader from "./components/movieUploader";
import HomePage from "./components/homepage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => isLoggedInFx());
  return (
    <ApolloProvider client={client}>
      <Header />
      <main className={"main"}>
        <header className="main__header">
          {!isLoggedIn ? (
            <Link className={"user-btn"} to={"/login"}>
              <PersonCircle className="icon" />
              {"Login"}
            </Link>
          ) : (
            <Link
              className={"user-btn login-btn"}
              to={"/"}
              onClick={() => {
                localStorage.token = undefined;
                setIsLoggedIn(false);
              }}
            >
              <PersonCircle className="icon" />
              {"Logout"}
            </Link>
          )}

          {isAdmin() ? (
            <Link className="user-btn upload-btn" to={"/upload"}>
              <CloudArrowUp className="icon" />
              {"Upload"}
            </Link>
          ) : (
            ""
          )}
        </header>
        <div className="main__content">
          <Routes>
            <Route
              path="/login"
              element={
                <Login
                  setIsLoggedInToTrue={() => {
                    setIsLoggedIn(true);
                  }}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/register"
              element={<SignUp isLoggedIn={isLoggedIn} />}
            />
            <Route path="/watch" element={<StreamPage />} />
            <Route path="/*" element={<HomePage />} />
            <Route path="/reset-account" element={<Reset />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/code-verification" element={<CodeVerification />} />
            <Route path="/upload" element={<MovieUploader />} />
            <Route
              path="/movies"
              element={
                <Movies key={"1"} category={"movie"} section={"Movies"} />
              }
            />
            <Route
              path="/animes"
              element={
                <Movies key={"2"} category={"anime"} section={"Animes"} />
              }
            />
            <Route
              path="/series"
              element={
                <Movies key={"3"} category={"tv-serie"} section={"Tv Shows"} />
              }
            />
          </Routes>
          {/* <Movies />
          <MoviesSlider /> */}
          {/* <StreamPage /> */}
          {/* <Login /> */}
          {/* <Reset /> */}
          {/* <SignUp /> */}
        </div>
      </main>
    </ApolloProvider>
  );
}
