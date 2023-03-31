import React from "react";
import PropTypes from "prop-types";
import styles from "./layout.less";
import { Outlet } from "react-router-dom";
import Bottom from "../components/common/Bottom";

Layout.propTypes = {
  children: PropTypes.element,
  bottom: PropTypes.element,
};
export default function Layout(props) {
  return (
    <div className={styles.app}>
      <div className={styles.body}>
        <Outlet />
      </div>
      <div className={styles.bottom}>
        <Bottom />
      </div>
    </div>
  );
}
