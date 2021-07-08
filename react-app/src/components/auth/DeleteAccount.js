import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./auth.css";

const DeleteAccount = () => {
  const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push('/')
        }, 1500)
    }, [])

  return (
    <div class="form-container">
        <h2>Sorry to see you go!</h2>
    </div>
  );
};

export default DeleteAccount;
