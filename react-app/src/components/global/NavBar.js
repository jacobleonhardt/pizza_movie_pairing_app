import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {

  const user = useSelector(state => state.session.user)

  return (
    <nav>
      <a href={!user ? '/' : `/${user.id}`}><h1>pieflix</h1></a>
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
    </nav>
  );
}

export default NavBar;
