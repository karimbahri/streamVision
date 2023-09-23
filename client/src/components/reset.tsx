import * as Icon from "react-bootstrap-icons";
import { useMutation } from "@apollo/react-hooks";
import client from "../apollo-client";
import Notification from "./notification";
import { setNotification } from "../utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setReset, setEmail as redux_setEmail } from "../redux/actions";
import { RESET_USER } from "../graphQl/mutations";

export default function Reset() {
  const [notificationClassValue, setNotificationClassValue] = useState("");
  const [notificationValue, setNotificationValue] = useState("");
  const [email, setEmail] = useState("");
  const setNotificationArgs = {
    notificationClassValue,
    setNotificationClassValue,
    notificationValue,
    setNotificationValue,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [resetUser, { loading }] = useMutation(RESET_USER, {
    onCompleted: () => {
      dispatch(setReset(true));
      dispatch(redux_setEmail(email));
      client.resetStore();
      setNotificationArgs.notificationClassValue =
        "notification-appear notification-success";
      setNotificationArgs.notificationValue = "Verification code sent !";
      setNotification(setNotificationArgs);
      navigate("/code-verification");
    },
    onError: (error) => {
      setNotificationArgs.notificationClassValue =
        "notification-appear notification-failure";
      setNotificationArgs.notificationValue = error.message;
      setNotification(setNotificationArgs);
    },
  });

  useEffect(() => {
    if (loading) {
      setNotificationArgs.notificationClassValue =
        "notification-appear notification-success";
      setNotificationArgs.notificationValue = "Loading...";
      setNotification(setNotificationArgs);
    }
    return () => {
      dispatch(setReset(false));
    };
  }, [loading]);

  return (
    <div className="login reset-page">
      <h1 className="login__header">Reset your password</h1>
      <form className="login__form">
        <div className="input-field">
          <Icon.PeopleFill className="login-icon email-label" />
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <a
          className="submit-btn"
          onClick={async () => {
            if (!email) {
              setNotificationArgs.notificationClassValue =
                "notification-appear notification-failure";
              setNotificationArgs.notificationValue =
                "Please fill all the fields";
              setNotification(setNotificationArgs);
            } else await resetUser({ variables: { email } });
          }}
        >
          Send email
        </a>
      </form>
      <Notification
        classValue={notificationClassValue}
        message={notificationValue}
      />
    </div>
  );
}
