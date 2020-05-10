import React, { useState } from "react";
import {ApplicationLauncher, ApplicationLauncherItem, Avatar, DropdownPosition, Button } from "@patternfly/react-core";
import { NavLink as RouterNavLink } from "react-router-dom";

import { useAuth0 } from "../react-auth0-spa";
const NavBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [hover, setHover] = useState(false);
  const { open, setOpel } = useState(false);

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin
    });
  const loginItems = [
    <ApplicationLauncherItem key="Profile" href="/profile">
      profile
    </ApplicationLauncherItem>,
    <ApplicationLauncherItem key="Logout" component="button" onClick={logoutWithRedirect} >
      logout
    </ApplicationLauncherItem>
  ];

  return (
    <div className="nav-container">
      <div style={{float: "left"}}>
      <h1>~The serious coronavirus app~</h1>
      </div>
      {!isAuthenticated && (
        <Button id="qsLoginBtn" variant="secondary" onClick={() => loginWithRedirect({})} style={{float:"right"}}>
          Log in
        </Button>
      )}
      {isAuthenticated && (
        <ul>
          <div style={{ float: "right" }}>
            <ApplicationLauncher position={DropdownPosition.right} isOpen={hover} items={loginItems} onToggle={() => setHover(!hover)} />
            <RouterNavLink to={"/profile"}>
              <Avatar src={user.picture} alt="Profile" className="nav-user-profile rounded-circle" width="50" />
            </RouterNavLink>
          </div>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
