import PasswordInput from "./passwordInput";
import { useMutation } from "@apollo/react-hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gql from "graphql-tag";
import client from "../apollo-client";
import Notification from "./notification";
import { setNotification } from "../utils";

const SIGNUP_MUTATION = gql`
  mutation createUser(
    $userName: String!
    $password: String!
    $passwordConfirmation: String!
    $fullName: String!
    $email: String!
    $birthday: String!
  ) {
    createUser(
      userName: $userName
      password: $password
      passwordConfirmation: $passwordConfirmation
      fullName: $fullName
      email: $email
      birthday: $birthday
    ) {
      id
    }
  }
`;

export default function SignUp(props: any) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [notificationClassValue, setNotificationClassValue] = useState("");
  const [notificationValue, setNotificationValue] = useState("");
  const isLoggedIn = props.isLoggedIn;

  const navigate = useNavigate();

  const setNotificationArgs = {
    notificationClassValue,
    setNotificationClassValue,
    notificationValue,
    setNotificationValue,
  };

  const [createUser, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    onCompleted: (data) => {
      console.log("data : ", data);
      client.resetStore();
      setNotificationArgs.notificationClassValue =
        "notification-appear notification-success";
      setNotificationArgs.notificationValue = "User created successfully";
      setNotification(setNotificationArgs);
      navigate("/");
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
    <div className="signup">
      <h1 className="signup__header">Create your account</h1>
      <form className="signup__form">
        <div className="input-field">
          <label htmlFor="fullname">FullName: </label>
          <input
            id="fullname"
            type="text"
            placeholder="FullName"
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="username">UserName: </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password: </label>
          <PasswordInput
            id="password"
            placeholder="Password"
            assignPassword={setPassword}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password-confirmation">Password confirmation: </label>
          <PasswordInput
            id="password-confirmation"
            placeholder="Password confirmation"
            assignPassword={setPasswordConfirmation}
          />
        </div>
        <div className="input-field">
          <label htmlFor="birthday">Birthday: </label>
          <input
            id="birthday"
            type="date"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </div>
      </form>
      <a
        onClick={async () => {
          await createUser({
            variables: {
              fullName,
              email,
              userName,
              password,
              passwordConfirmation,
              birthday,
            },
          });
          console.log(birthday);
        }}
        className="submit-btn"
      >
        Sign up
      </a>
      <Notification
        classValue={notificationClassValue}
        message={notificationValue}
      />
    </div>
  );
}
