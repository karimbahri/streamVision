import { LockFill } from "react-bootstrap-icons";
import PasswordInput from "./passwordInput";
import { useEffect, useState } from "react";
import { setNotification } from "../utils";
import Notification from "./notification";
import { useMutation } from "@apollo/react-hooks";
import client from "../apollo-client";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCode,
  setEmail as redux_setEmail,
  setReset,
} from "../redux/actions";
import { RESET_PASSWORD } from "../graphQl/mutations";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [notificationClassValue, setNotificationClassValue] = useState("");
  const [notificationValue, setNotificationValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [redux_code, setRedux_code] = useState(
    useSelector((state: { code: any }) => state.code)
  );
  const [email, setEmail] = useState(
    useSelector((state: { email: any }) => state.email)
  );

  const [timeoutId] = useState(
    useSelector((state: { timeoutId: any }) => state.timeoutId)
  );

  const setNotificationArgs = {
    notificationClassValue,
    setNotificationClassValue,
    notificationValue,
    setNotificationValue,
  };

  const [updateUserPassword, { loading }] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      client.resetStore();
      dispatch(setCode(""));
      dispatch(redux_setEmail(""));
      setNotificationArgs.notificationClassValue =
        "notification-appear notification-success";
      setNotificationArgs.notificationValue = "Success !";
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
    if (!redux_code) navigate("/");
    if (loading) {
      setNotificationArgs.notificationClassValue =
        "notification-appear notification-success";
      setNotificationArgs.notificationValue = "Loading...";
      setNotification(setNotificationArgs);
    }

    return () => {
      if (!redux_code) navigate("/");
      dispatch(setReset(false));
    };
  }, [loading]);

  return (
    <div className="login">
      <h1 className="login__header">Reset password</h1>
      <form className="login__form">
        <div className="input-field">
          <LockFill className="login-icon pass-label" />
          <PasswordInput placeholder="Password" assignPassword={setPassword} />
        </div>
        <div className="input-field">
          <LockFill className="login-icon pass-label" />
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
            } else
              await updateUserPassword({
                variables: {
                  email,
                  code: redux_code,
                  oldPassword: password,
                  newPassword: passwordConfirmation,
                },
              });
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
