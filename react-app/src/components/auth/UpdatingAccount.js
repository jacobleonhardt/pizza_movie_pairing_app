import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import "./auth.css";

const UpdatingAccount = () => {
  const user = useSelector(state => state.session.user)
  const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push('/')
        }, 1000)
    }, [])

  return (
    <div class="form-container">
        <h2>Updating {user.username}'s Account.</h2>
    </div>
  );
};

export default UpdatingAccount;
