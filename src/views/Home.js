import React, { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Tabulka from "../components/Tabulka";
import { Pagination } from "@patternfly/react-core";
const koronaDedToday = (koronky) => {
  console.log("koronaded", koronky);
  return !koronky
    ? []
    : Object.keys(koronky).map((country, values) => {
        const today = koronky[country].slice(-2)[0];
        const beforeWeek = koronky[country].slice(-9)[0];
        const weekChange = (100 * today["confirmed"]) / beforeWeek["confirmed"] - 100;
        const weekChangeText = /*(weekChange > 0 ? "+" : "")*/ Math.round(weekChange);
        return [
          country,
          today["confirmed"],
          beforeWeek["confirmed"],
          today["confirmed"] - beforeWeek["confirmed"],
          beforeWeek["confirmed"] < 50 ? "" : weekChangeText,
          today["deaths"]
        ];
      });
};
const Home = () => {
  // const { loading, user } = useAuth0();
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);
  const [direction, setDirection] = useState(-1);
  const [koronaData, setKoronaData] = useState({});
  async function fetchData() {
    const res = await fetch("https://pomber.github.io/covid19/timeseries.json");
    console.log("spadne", res);
    res.json().then((res) => setKoronaData(res));
  }
  const loading = false;
  const user = false;
  useEffect(() => {
    if (!loading) {
      fetchData();
    }
  }, [loading, user]);
  const onSort = (_event, index) => {
    setDirection(-direction);
    setIndex(index);
  };
  const sortFunc = (a, b) => {
    return direction * (b[index] < a[index] ? 1 : -1);
  };
  const onSetPage = (_event, page) => {
    setPage(page);
  };

  const onSetPerPage = (_event, perPage) => {
    setItems(perPage);
  };
  return (
    <Fragment>
      <h1>There will not be dragons</h1>

      {!user && <h2>Log in to show some data</h2>}
      {koronaData !== {} && console.log("koronky jsou", koronaData)}
      {koronaData !== {} && (
        <Pagination itemCount={Object.keys(koronaData).length} perPage={items} page={page} onSetPage={onSetPage} onPerPageSelect={onSetPerPage} />
      )}
      {koronaData !== {} && (
        <pre>
          {
            <Tabulka
              rows={koronaDedToday(koronaData)
                .sort(sortFunc)
                .slice(page * items - items, page * items)}
              onSort={onSort}
            />
          }
        </pre>
      )}
      {user && koronaData !== {} && (
        <Pagination itemCount={Object.keys(koronaData).length} perPage={items} page={page} onSetPage={onSetPage} onPerPageSelect={onSetPerPage} />
      )}
    </Fragment>
  );
};

export default Home;
