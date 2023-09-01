import * as Icon from "react-bootstrap-icons";
import PasswordInput from "./passwordInput";
import { useState } from "react";
import { setNotification } from "../utils";
import Notification from "./notification";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
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
      <h1 className="login__header">Reset password</h1>
      <form className="login__form">
        <div className="input-field">
          <Icon.LockFill className="login-icon pass-label" />
          <PasswordInput placeholder="Password" assignPassword={setPassword} />
        </div>
        <div className="input-field">
          <Icon.LockFill className="login-icon pass-label" />
          <PasswordInput
            placeholder="PasswordConfirmation"
            assignPassword={setPasswordConfirmation}
          />
        </div>
        <a
          className="submit-btn"
          onClick={async () => {
            if (!password || !passwordConfirmation) {
              setNotificationArgs.notificationClassValue =
                "notification-appear notification-failure";
              setNotificationArgs.notificationValue =
                "Please fill all the fields";
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
