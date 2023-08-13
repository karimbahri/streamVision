import jwtDecode from "jwt-decode";

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

  if (!setNotificationClassValue || !setNotificationValue) return;

  setNotificationClassValue(notificationClassValue);
  setNotificationValue(notificationValue);
  setTimeout(() => {
    setNotificationClassValue("");
  }, 3000);
};
