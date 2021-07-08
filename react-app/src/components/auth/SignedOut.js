import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import "./auth.css";

const SignedOut = () => {
  const history = useHistory()

    useEffect(() => {
        setTimeout(() => {
            history.push('/')
        }, 1500)
    }, [])

  return (
    <div class="form-container">
        <h2>See you later!</h2>
    </div>
  );
};

export default SignedOut;
