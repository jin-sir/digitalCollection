import React from "react";
import styles from './index.less'

export default function Loading(props) {
  return (
    <div
      className={`${styles.loading} ${
        props.status === "pulling" ? styles.loading_pause : ""
      }`}
    >
      <div>
        <span></span>
        <i></i>
      </div>
      <div>
        <span></span>
        <i></i>
      </div>
      <div>
        <span></span>
        <i></i>
      </div>
    </div>
  );
}
