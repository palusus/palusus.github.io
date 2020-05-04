import React, { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Tabulka from "../components/Tabulka";
import CoronaChart from "../components/CoronaChart";
import { Pagination, TextInput} from "@patternfly/react-core";
const koronaDedToday = (koronky) => {
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
  const [countryFilter, setCountryFilter] = useState("");
  const [tableMode, setTableMode] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState(["US", "Czechia"]);

  const toggleTableMode = () => {
    setTableMode(!tableMode);
  };

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
      <h1>The serious coronavirus app</h1>
      {koronaData !== {} && console.log("koronky jsou", koronaDedToday(koronaData))}
      {koronaData !== {} && (
        <Pagination itemCount={Object.keys(koronaData).length} perPage={items} page={page} onSetPage={onSetPage} onPerPageSelect={onSetPerPage} />
      )}
      <Switch id="tableSwitch" label={"Table mode"} labelOff="Graph mode" isChecked={tableMode} onChange={toggleTableMode} />
      <div style={{ marginLeft: "30%" }}>
        <TextInput type="text" onChange={setCountryFilter} placeholder="search country..." aria-label="search country" />
      </div>
      <div style={{ float: "left", width: "30%" }}>
        <img src="https://www.globsec.org/wp-content/uploads/2020/04/Corona-virus-image.jpg" alt="" style={{ float: "left" }} />
        <img
          src="https://i.redd.it/q4dgjo77y6n41.jpg"
          alt='When you find out your daily lifestyle is called "quarantine"'
          style={{ float: "left" }}
        />
      </div>
      <div style={{ float: "right", width: "70%" }}>
        {koronaData !== {} && tableMode && (
          <pre>
            {
              <Tabulka
                rows={koronaDedToday(koronaData)
                  .filter((x) => x[0].includes(countryFilter))
                  .sort(sortFunc)
                  .slice(page * items - items, page * items)}
                onSort={onSort}
              />
            }
          </pre>
        )}
        {koronaData !== {} && !tableMode && <CoronaChart koronky={Object.keys(koronaData).filter((x) => selectedCountries.includes(x)).map((country)=> {return [country, koronaData[country]]})} />}
      </div>
      {user && koronaData !== {} && (
        <Pagination itemCount={Object.keys(koronaData).length} perPage={items} page={page} onSetPage={onSetPage} onPerPageSelect={onSetPerPage} />
      )}
    </Fragment>
  );
};

export default Home;
