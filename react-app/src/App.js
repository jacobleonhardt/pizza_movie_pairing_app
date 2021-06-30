import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/global/NavBar";
import Footer from "./components/global/Footer";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Landing from "./components/home/Landing";
import User from "./components/home/User";
import PairingForm from "./components/pair/PairingForm";
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
  }, []);

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
        {/* <ProtectedRoute path="/:userId" exact={true}>
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path="/new" exact={true}>
          <PairingForm />
        </ProtectedRoute>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
