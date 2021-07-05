import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login, loginDemo } from "../../store/session";
import "./auth.css";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/`)
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/`} />;
  }

  const demo = async (e) => {
    e.preventDefault();
    const data = await dispatch(loginDemo());
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/`)
    }
  };


  return (
    <div class="form-container">
    <h2>Welcome Back</h2>
    <form onSubmit={onLogin}>
      {errors.length > 0 ?
      <div className="form-errors">
         {errors.map((error) => (
          <div className="error">{error}</div>
        ))}
      </div> : <></>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
          />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
          />
        <button type="submit">Login</button>
      </div>
      <button id="demo-user" onClick={e => demo(e)}>Demo User</button>
    </form>
    </div>
  );
};

export default LoginForm;
