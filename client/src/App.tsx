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
import { isLoggedIn as isLoggedInFx } from "./utils";
// import { ApolloProvider } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import client from "./apollo-client";
import { useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => isLoggedInFx());
  return (
    <ApolloProvider client={client}>
      <Header />
      <main className={"main"}>
        <header className="main__header">
          <button className="user-btn">
            <i className="bi bi-person-circle"></i>
            {!isLoggedIn ? (
              <Link to={"/login"}>{"Login"}</Link>
            ) : (
              <Link
                to={"/"}
                onClick={() => {
                  localStorage.token = undefined;
                  setIsLoggedIn(false);
                }}
              >
                {"Logout"}
              </Link>
            )}
            {/* <Link to={"/login"}>{!isLoggedIn ? "Login" : "Logout"}</Link> */}
          </button>
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
                />
              }
            />
            <Route path="/watch" element={<StreamPage />} />
            <Route path="/*" element={<Movies />} />
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
