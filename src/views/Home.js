import React, { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Api from "../utils/api";
import Tabulka from "../components/Tabulka";
import KoronaTabulka from "../components/Tabulka";
import { Pagination, PaginationVariant } from "@patternfly/react-core";
const koronaDedToday = (koronky) => {
  console.log("koronaded", koronky);
  return !koronky
    ? []
    : Object.keys(koronky).map((country, values) => {
        const vals = koronky[country].slice(-1)[0];
        return [country, vals["confirmed"], vals["deaths"]];
      });
};
const Home = () => {
  const { loading, user } = useAuth0();
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);
  const [direction, setDirection] = useState(1);
  const [koronaData, setKoronaData] = useState({});
  async function fetchData() {
    const res = await fetch("https://pomber.github.io/covid19/timeseries.json");
    console.log("spadne", res);
    res.json().then((res) => setKoronaData(res));
  }
  useEffect(() => {
    if (!loading && user) {
      fetchData();
    }
  }, [loading, user]);
  const onSort = (_event, index, dir) => {
    setDirection(-direction);
    setIndex(index);
    console.log("stav", direction, index);
    // setKoronaData(koronaData.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0)));
    // this.setState({
    //   sortBy: {
    //     index,
    //     direction
    //   },
    //   rows: direction === SortByDirection.asc ? sortedRows : sortedRows.reverse()
    // });
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
      {user && koronaData !== {} && console.log("koronky jsou", koronaData)}
      {user && koronaData !== {} && <Pagination itemCount={Object.keys(koronaData).length} perPage={items} page={page} onSetPage={onSetPage} onPerPageSelect={onSetPerPage} />}
      {user && koronaData !== {} && (
        <pre>
          {
            <Tabulka
              rows={koronaDedToday(koronaData)
                .sort(sortFunc)
                .slice(page * items-items, page * items)}
              onSort={onSort}
            />
          }
        </pre>
      )}
    </Fragment>
  );
};

export default Home;
