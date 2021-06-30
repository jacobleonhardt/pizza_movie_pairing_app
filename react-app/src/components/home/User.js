import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./home.css";

function User() {
  const [user, setUser] = useState({});
  // Notice we use useParams here instead of getting the params
  // From props.
  const { userId }  = useParams();
  const user_info = useSelector(state => state.session.user)

  const previous = useSelector(state => state.previous)

  useEffect(() => {
    if (!userId) {
      return
    }
    (async () => {
      const response = await fetch(`/api/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className="content">
      <div className="greeting">
        <h2>Hey there, {user_info.username}</h2>
        <a className="button-link" href="/new">Find a Film</a>
      </div>
      <div id="previous" className="solid-block">
        <h3>Previous Pairings</h3>
        {previous ? <></> :
        <>
          <div className="none-message">You don't have any Previous Pairs. Let's go get some!</div>
          <a className="button-link-alt" href="/new">Find a Film</a>
        </>}
      </div>
    </div>

  );
}
export default User;
