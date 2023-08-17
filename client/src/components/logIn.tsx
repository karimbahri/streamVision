import * as Icon from "react-bootstrap-icons";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import client from "../apollo-client";
import PasswordInput from "./passwordInput";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { /*isLoggedIn,*/ setNotification } from "../utils";
import Notification from "./notification";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function Login(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notificationClassValue, setNotificationClassValue] = useState("");
  const [notificationValue, setNotificationValue] = useState("");
  const setLoggedInToTrue = props.setIsLoggedInToTrue;
  const isLoggedIn = props.isLoggedIn;
  const navigate = useNavigate();
  const setNotificationArgs = {
    notificationClassValue,
    setNotificationClassValue,
    notificationValue,
    setNotificationValue,
  };

  // const setNotification = (
  //   notificationClassValue: any,
  //   notificationValue: any
  // ) => {
  //   setNotificationClassValue(notificationClassValue);
  //   setNotificationValue(notificationValue);
  //   setTimeout(() => {
  //     setNotificationClassValue("");
  //   }, 3000);
  // };

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log("data : ", data);
      localStorage.setItem("token", data.login);
      client.resetStore();
      setLoggedInToTrue();
      // navigate("/");
    },
    onError: (error) => {
      setNotificationArgs.notificationClassValue =
        "notification-appear notification-failure";
      setNotificationArgs.notificationValue = error.message;
      setNotification(setNotificationArgs);
    },
  });

  useEffect(() => {
    if (isLoggedIn) navigate("/");

    if (loading) {
      setNotificationArgs.notificationClassValue =
        "notification-appear notification-success";
      setNotificationArgs.notificationValue = "Loading...";
      setNotification(setNotificationArgs);
    }
  }, [loading]);

  return (
    <div className="login">
      <h1 className="login__header">Welcome back</h1>
      <form className="login__form">
        <div className="input-field">
          <Icon.PeopleFill className="login-icon email-label" />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <Icon.LockFill className="login-icon pass-label" />
          <PasswordInput placeholder="Password" assignPassword={setPassword} />
          {/* <input
            type="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          /> */}
        </div>
        <a href="#" className="reset-pass">
          Forgot password?
        </a>
        <a
          className="submit-btn"
          onClick={async () => {
            if (!email || !password) {
              setNotificationArgs.notificationClassValue =
                "notification-appear notification-failure";
              setNotificationArgs.notificationValue =
                "Please fill all the fields";
              setNotification(setNotificationArgs);
            } else await login({ variables: { email, password } });
          }}
        >
          Login
        </a>
      </form>
      <p className="create-account">
        Don't have account?{" "}
        <Link className={"anchor"} to={"/register"}>
          sign up
        </Link>
      </p>
      <Notification
        classValue={notificationClassValue}
        message={notificationValue}
      />
    </div>
  );
}
