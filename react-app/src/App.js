import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/global/NavBar";
import Footer from "./components/global/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import EditForm from "./components/auth/EditForm";
import Landing from "./components/home/Landing";
import User from "./components/home/User";
import PairingForm from "./components/pair/PairingForm";
import NotFound from "./components/404/notfound"
import { authenticate } from "./store/session";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact={true} >
          {user ? <User /> : <Landing />}
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/new-account" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/pair" exact={true}>
          <PairingForm />
        </ProtectedRoute>
        <ProtectedRoute path="/account" exact={true}>
          <EditForm />
        </ProtectedRoute>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route path="*">
          <Redirect to="/404" />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
