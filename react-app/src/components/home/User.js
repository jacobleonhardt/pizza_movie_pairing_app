import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPairs } from "../../store/pairing";
import PrevPairingCard from "./PrevPairs/PrevPairings"
import "./home.css";

function User() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const user_info = useSelector(state => state.session.user)
  const previous = useSelector(state => state.pairing)
  const userId = user_info.id


  useEffect(() => {
    if (!userId) {
      return
    }

    (async () => {
      const response = await fetch(`/api/user/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
      dispatch(getPairs(userId))
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="content">
      <div className="greeting">
        <h2>Hey there, {user_info.username}</h2>
        <Link className="button-link" to="/pair">Find a Film</Link>
      </div>
      <div id="previous" className="solid-block">
        <h3>Previous Pairings</h3>
          {previous ?
          <div>
            {previous.map(movie => <PrevPairingCard key={movie.id} movie={movie}/>)}
          </div> :
        <>
          <div className="none-message">You don't have any Previous Pairs. Let's go get some!</div>
          <a className="button-link-alt" href="/new">Find a Film</a>
        </>}
      </div>
    </div>

  );
}
export default User;
