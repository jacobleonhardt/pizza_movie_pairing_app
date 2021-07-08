import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { updateUser, deleteUser } from "../../store/session";
import { resetPrevPairs } from "../../store/pairing";
import { resetUserReviews } from "../../store/review";
import "./auth.css";

const EditForm = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const user = useSelector(state => state.session.user)
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const updateAccount = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(updateUser(user.id, username, email, password));

      if (data.errors) {
        setErrors(data.errors);
      } else {
        history.push('/updating-account')
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

const deleteAccount = async(e) => {
  e.preventDefault();
  await dispatch(resetUserReviews())
  await dispatch(resetPrevPairs())
  await dispatch(deleteUser(user.id))
  return history.push('/account-deleted')
}

  return (
    <div class="form-container">
    <h2>Update Account</h2>
    <form onSubmit={updateAccount}>
    {errors.length > 0 ?
      <div className="form-errors">
         {errors.map((error) => (
          <div className="error">{error}</div>
        ))}
      </div> : <></>}
      <div>
        <label>User Name</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <input
          type="password"
          name="repeat_password"
          placeholder="Confirm Password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={password != ''}
        ></input>
      </div>
      <button type="submit">Update Account</button>
    </form>
    <button id="delete-account-button" type="submit" onClick={deleteAccount}>Delete Account</button>
    </div>
  );
};

export default EditForm;
