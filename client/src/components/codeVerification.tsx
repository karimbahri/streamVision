import * as Icon from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import client from "../apollo-client";
import { setNotification } from "../utils";
import Notification from "./notification";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCode as redux_setCode, setReset } from "../redux/actions";

const CHECK_VERIFICATION_CODE = gql`
  mutation chaeckVerificationUser($email: String!, $code: String!) {
    chaeckVerificationUser(email: $email, code: $code)
  }
`;

export default function CodeVerification() {
  const [code, setCode] = useState("");
  const [notificationClassValue, setNotificationClassValue] = useState("");
  const [notificationValue, setNotificationValue] = useState("");
  const [isReset, setIsReset] = useState(
    useSelector((state: { isReset: any }) => state.isReset)
  );
  const [email, setEmail] = useState(
    useSelector((state: { email: any }) => state.email)
  );

  const dispatch = useDispatch();

  const setNotificationArgs = {
    notificationClassValue,
    setNotificationClassValue,
    notificationValue,
    setNotificationValue,
  };

  const navigate = useNavigate();

  const [chaeckVerificationUser, { loading }] = useMutation(
    CHECK_VERIFICATION_CODE,
    {
      onCompleted: () => {
        client.resetStore();
        dispatch(redux_setCode(code));
        setIsReset(false);
        dispatch(setReset(isReset));
        setNotificationArgs.notificationClassValue =
          "notification-appear notification-success";
        setNotificationArgs.notificationValue = "Success !";
        setNotification(setNotificationArgs);
        navigate("/reset-password");
      },
      onError: (error) => {
        setNotificationArgs.notificationClassValue =
          "notification-appear notification-failure";
        setNotificationArgs.notificationValue = error.message;
        setNotification(setNotificationArgs);
      },
    }
  );

  useEffect(() => {
    if (!isReset) navigate("/");

    if (loading) {
      setNotificationArgs.notificationClassValue =
        "notification-appear notification-success";
      setNotificationArgs.notificationValue = "Loading...";
      setNotification(setNotificationArgs);
    }
    return () => {
      if (!isReset) navigate("/");
      dispatch(redux_setCode(code));
    };
  }, [loading]);
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
            } else await chaeckVerificationUser({ variables: { code, email } });
          }}
        >
          Verify
        </a>
      </form>

      <Notification
        classValue={notificationClassValue}
        message={notificationValue}
      />
    </div>
  );
}
