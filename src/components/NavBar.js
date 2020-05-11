import React, { useState } from "react";
import {
    ApplicationLauncher,
    ApplicationLauncherItem,
    Avatar,
    DropdownPosition,
    Button,
    Popover, Alert
} from "@patternfly/react-core";
import { NavLink as RouterNavLink } from "react-router-dom";

import { useAuth0 } from "../react-auth0-spa";
import Loading from "./Loading";
const NavBar = () => {
  const { user, isAuthenticated, loginWithRedirect, logout, loading} = useAuth0();
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
    <div className="nav-container" style={{margin:"1%"}}>
      <div style={{float: "left"}}>
      <h1 style={{fontFamily:"Courier New", fontSize:40}}>The serious coronavirus app</h1>
          </div>
        {loading?<Loading/>:<div>
      {!isAuthenticated && (
        <Button id="qsLoginBtn" variant="secondary" onClick={() => loginWithRedirect({})} style={{float:"right"}}>
          Log in
        </Button>
      )}
      {isAuthenticated && (
        <div>
          <div style={{ float: "right"}}>
            <Popover aria-label={"profile"} bodyContent=
                <div style={{textAlign:"center"}}>
                <p> <b>nick:</b> {user["nickname"]}</p>
                <p><b>e-mail:</b> {user["name"]} </p>
                <br />
                <br />
                <img src={user.picture} alt="Profile" className="nav-user-profile rounded-circle" />
                <br />
                <br />
                <br />
                <Button variant="tertiary" onClick={logoutWithRedirect}>Log out</Button>
                <br />
                <br />

                {!user["verified"]&&<Alert variant="warning" isInline title="e-mail is not verified!"/>}
                </div>>

              <Avatar src={user.picture} alt="Profile" className="nav-user-profile rounded-circle" width="50" />
            </Popover>
          </div>
        </div>
      )}
        </div>}<br/><br/></div>
);
};

export default NavBar;
