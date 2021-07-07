import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './nav_footer.css';

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <div className="left">
        <a id="logo" href="/">pieflix</a>
      </div>
      <div className="right">
      {!user ?
      <>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/new-account" exact={true} className="nav-button" activeClassName="active">
            New Account
          </NavLink>
          </> : <>
          <NavLink to="/" exact={true} activeClassName="active">
            Pairings
          </NavLink>
          <NavLink to="/pair" exact={true} activeClassName="active">
            New Pair
          </NavLink>
          <NavLink to="/account" exact={true} activeClassName="active">
            Account
          </NavLink>
          <LogoutButton />
        </>}
      </div>
    </nav>
  );
}

export default NavBar;
