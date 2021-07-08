import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { resetPrevPairs } from "../../store/pairing";
import { resetUserReviews } from "../../store/review";
import { useHistory } from "react-router-dom";
const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch();

  const onLogout = async (e) => {
    await dispatch(logout());
    await dispatch(resetPrevPairs())
    await dispatch(resetUserReviews())
    return history.push('/signed-out')
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
