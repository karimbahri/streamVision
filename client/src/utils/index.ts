import jwtDecode from "jwt-decode";
// import { useDispatch, useSelector } from "react-redux";
import store from "../redux/store";
import { setTimeoutId } from "../redux/actions";

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const { exp }: { exp: any } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const setNotification = (setNotificationArgs: {
  notificationClassValue?: string;
  setNotificationClassValue?: Function;
  notificationValue?: string;
  setNotificationValue?: Function;
}) => {
  const {
    notificationClassValue,
    setNotificationClassValue,
    notificationValue,
    setNotificationValue,
  } = setNotificationArgs;

  const timeoutId = store.getState().timeoutId;
  // const dispatch = useDispatch();

  clearTimeout(timeoutId);

  if (!setNotificationClassValue || !setNotificationValue) return;

  setNotificationClassValue(notificationClassValue);
  setNotificationValue(notificationValue);
  store.dispatch(
    setTimeoutId(
      setTimeout(() => {
        setNotificationClassValue("");
      }, 5500)
    )
  );
};
