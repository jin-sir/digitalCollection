import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "antd-mobile";

export default function NavigationBar(props) {
  const navigate = useNavigate();
  const goBack = useCallback(() => {
    navigate(props.path, {state: props.state});
  }, [navigate, props]);

  return (
    <NavBar
      backArrow={props.backArrow === undefined ? true : props.backArrow}
      onBack={goBack}
    >
      {props.title}
    </NavBar>
  );
}
