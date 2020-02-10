import React from "react";
import { NavLink as RouterNavLink } from "react-router-dom";

import { useAuth0 } from "../react-auth0-spa";

const NavBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });

  return (
    <div className="nav-container">
      {!isAuthenticated && (
        <button id="qsLoginBtn" type="button" onClick={() => loginWithRedirect({})}>
          Log in
        </button>
      )}
      {isAuthenticated && (
        <ul>
          <li>
            <img src={user.picture} alt="Profile" className="nav-user-profile rounded-circle" width="50" />
            {user.name}
          </li>
          <li>
            <RouterNavLink to="/profile">Profile</RouterNavLink>
          </li>
          <li>
            <button onClick={() => logoutWithRedirect()}>Log out</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
