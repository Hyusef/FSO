import { useSelector } from "react-redux";

const Notification = () => {
  const notif = useSelector((state) => state);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{notif.message && notif.message}</div>;
};

export default Notification;
