import React, { useEffect, useState } from "react";
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
    const data = dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }
    history.push(`/${data.id}`)
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  const demo = (e) => {
    e.preventDefault();
    const data = dispatch(loginDemo());
    if (data.errors) {
      setErrors(data.errors);
    }
    history.push(`/${data.id}`)
  };


  return (
    <div class="form-container">
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
      </div>
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
