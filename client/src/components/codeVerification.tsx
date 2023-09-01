import * as Icon from "react-bootstrap-icons";
import { useState } from "react";
import { setNotification } from "../utils";
import Notification from "./notification";

export default function CodeVerification() {
  const [code, setCode] = useState("");
  const [notificationClassValue, setNotificationClassValue] = useState("");
  const [notificationValue, setNotificationValue] = useState("");

  const setNotificationArgs = {
    notificationClassValue,
    setNotificationClassValue,
    notificationValue,
    setNotificationValue,
  };
  return (
    <div className="login">
      <h1 className="login__header">Email confirmation</h1>
      <form
        className="login__form"
        style={{
          gap: "3rem",
          marginTop: "1.3rem",
        }}
      >
        <div className="input-field">
          <Icon.LockFill className="login-icon pass-label" />
          <input
            type="text"
            placeholder="Verification Code"
            onChange={(event) => {
              setCode(event.target.value);
            }}
          />
        </div>
        <a
          className="submit-btn"
          onClick={async () => {
            if (!code) {
              setNotificationArgs.notificationClassValue =
                "notification-appear notification-failure";
              setNotificationArgs.notificationValue = "Please fill the field";
              setNotification(setNotificationArgs);
            } /*else await login({ variables: { email, password } });*/
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
