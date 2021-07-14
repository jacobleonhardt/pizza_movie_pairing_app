import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import { loginDemo } from '../../store/session';
import './nav_footer.css';
import './mobile.css';

const MobileNav = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [open, setOpen] = useState(false)

    const clickMobileNav = () => {
        setOpen(!open)
    }

    const navClicked = () => {
        setOpen(false)
    }

    const demo = async (e) => {
        e.preventDefault();
        const data = await dispatch(loginDemo());
        history.push(`/`)
    }

    useEffect(() => {
        setOpen(false)
    }, [LogoutButton])

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
                            <NavLink onClick={navClicked} to="/login" exact={true} activeClassName="active">
                                Login
                            </NavLink>
                            <NavLink to="#" onClick={demo} exact={true} className="nav-button" activeClassName="active">
                                Demo User
                            </NavLink>
                            <NavLink onClick={navClicked} to="/new-account" exact={true} className="nav-button" activeClassName="active">
                                New Account
                            </NavLink>
                        </> :
                        <>
                            <NavLink onClick={navClicked} to="/" exact={true} activeClassName="active">
                                Pairings
                            </NavLink>
                            <NavLink onClick={navClicked} to="/pair" exact={true} activeClassName="active">
                                New Pair
                            </NavLink>
                            <NavLink onClick={navClicked} to="/account" exact={true} activeClassName="active">
                                Account
                            </NavLink>
                            <span onClick={navClicked}><LogoutButton /></span>
                        </>
                    }
                </div>
            </div>
        </nav>
    )
}

export default MobileNav;
