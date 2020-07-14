import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert as CustomAlert } from "react-bootstrap";
import styles from "../../css/alertStyle.module.css";

const Alert = ({ alerts }) => {
  // return alerts.map(alert => (
  //   <Fragment>
  //     <CustomAlert key={alert.id} variant={alert.alertType} style={alertStyle}>
  //       {alert.msg}
  //     </CustomAlert>
  //   </Fragment>
  // ));

  return (
    <Fragment>
      <div className={styles.alert_container_style}>
        {alerts.map((alert) => (
          <CustomAlert
            key={alert.id}
            variant={alert.alertType}
            className={styles.alert_style}
          >
            {alert.msg}
          </CustomAlert>
        ))}
      </div>
    </Fragment>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
