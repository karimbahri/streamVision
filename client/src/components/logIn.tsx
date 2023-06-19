import * as Icon from "react-bootstrap-icons";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import client from "../apollo-client";
import PasswordInput from "./passwordInput";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils";
import Notification from "./notification";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export default function Login(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setLoggedInToTrue = props.setIsLoggedInToTrue;
  const navigate = useNavigate();

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      console.log("data : ", data);
      localStorage.setItem("token", data.login);
      client.resetStore();
      setLoggedInToTrue();
      navigate("/");
    },
    onError: (error) => {
      console.log("l3asba : ", error);
    },
  });

  useEffect(() => {
    if (isLoggedIn()) navigate("/");
  }, []);

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
          {/* <PasswordInput placeholder="Password" assignPassword={setPassword} /> */}
          <input
            type="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <a href="#" className="reset-pass">
          Forgot password?
        </a>
        <a
          className="submit-btn"
          onClick={async () => {
            console.log(`email: ${email} | password: ${password}`);
            await login({ variables: { email, password } });
          }}
        >
          Login
        </a>
      </form>
      <p className="create-account">
        Don't have account? <a href="#">sign up</a>
      </p>
      <Notification />
    </div>
  );
}