import React, { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Api from "../utils/api";
import Tabulka from "../components/Tabulka";

const Home = () => {
  const { loading, user } = useAuth0();
  const [data, setData] = useState([]);
  useEffect(() => {
    if (!loading && user) {
      Api.get("rest/temp-avg").then((dat) => setData(dat));
      // eslint-disable-next-line
      console.log(data);
    }
  }, [loading, user]);
  return (
    <Fragment>
      <h1>There will not be dragons</h1>
      {!user && <h2>Log in to show some data</h2>}
      {user && <pre>{<Tabulka rows={data} />}</pre>}
    </Fragment>
  );
};

export default Home;
