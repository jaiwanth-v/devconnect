import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

const Alert = ({ alerts }) => {
  const alertComp = useAlert();
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      if (alert.alertType === "success") alertComp.success(alert.msg);
      if (alert.alertType === "danger") alertComp.error(alert.msg);
      return null;
    })
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
