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
        <a id="logo" href={!user ? '/' : `/${user.id}`}>pieflix</a>
      </div>
      <div className="right">
      {!user ?
      <>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
          <NavLink to="/create-account" exact={true} activeClassName="active">
            Create Account
          </NavLink>
          </> : <>
            <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
          <LogoutButton />
        </>}
      </div>
    </nav>
  );
}

export default NavBar;
