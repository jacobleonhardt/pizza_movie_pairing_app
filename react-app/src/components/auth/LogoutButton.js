import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { resetPrevPairs } from "../../store/pairing";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(resetPrevPairs())
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
