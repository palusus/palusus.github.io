import React from "react";

import Loading from "../components/Loading";
import { useAuth0 } from "../react-auth0-spa";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div>
      <img src={user.picture} alt="Profile" />
      <div>
        <h2>{user.name}</h2>
        <p className="lead text-muted">{user.email}</p>
      </div>
      <div>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Profile;
