import React, { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Api from "../utils/api";

const Home = () => {
  const { loading, user } = useAuth0();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!loading && user) {
      Api.get("rest/wind-speed").then((data) => setData(data));
    }
  }, [loading, user]);
  return (
    <Fragment>
      <h1>There will be dragons</h1>
      {!user && <h2>Log in to show some data</h2>}
      {user && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Fragment>
  );
};

export default Home;
