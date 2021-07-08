import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './nav_footer.css';
import './mobile.css';

const MobileNav = () => {

    const user = useSelector(state => state.session.user)
    const [open, setOpen] = useState(false)

    const clickMobileNav = () => {
        setOpen(!open)
    }

    return(
        <nav>
            <div className="left mobile">
                <a id="logo" href="/">pieflix</a>
            </div>
            <div className="right mobile">
                <button id="menu" className={open ? "open" : "closed"} onClick={clickMobileNav}>{open ? <ion-icon name="close-outline"></ion-icon> : <ion-icon name="menu-outline"></ion-icon>}</button>
                <div id="mobile-menu" className={open ? "display" : "hide"}>
                    {!user ?
                        <>
                            <NavLink to="/login" exact={true} activeClassName="active">
                                Login
                            </NavLink>
                            <NavLink to="/new-account" exact={true} activeClassName="active">
                                New Account
                            </NavLink>
                        </> :
                        <>
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
                        </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default MobileNav;
