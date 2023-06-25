import { useEffect, useState } from "react";

export default function Notification(props: any) {
  const [notificationClassValue, setNotificationClassValue] = useState("");
  const [notificationValue, setNotificationValue] = useState("");

  useEffect(() => {
    setNotificationClassValue(props.classValue);
    setNotificationValue(props.message);

    // setTimeout(() => {
    //   setNotificationClassValue("");
    // }, 3000);
  }, [props.classValue, props.message]);
  return (
    <div className={`notification ${notificationClassValue}`}>
      <p>{notificationValue}</p>
    </div>
  );
}
