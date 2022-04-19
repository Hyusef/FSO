import { useSelector, connect } from "react-redux";

const Notification = (props) => { 
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{props.message && props.message}</div>;
};

const mapStateToProps = (state) => {
  return {
    message: state.message,
  };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;
