import React, { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Tabulka from "../components/Tabulka";
import CoronaChart from "../components/CoronaChart";
import { Pagination, TextInput, Switch } from "@patternfly/react-core";
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
  const { loading, user } = useAuth0();
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);
  const [direction, setDirection] = useState(-1);
  const [koronaData, setKoronaData] = useState({});
  const [countryFilter, setCountryFilter] = useState("");
  const [tableMode, setTableMode] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState(new Set(["Philippines", "Czechia"]));//["Philippines", "Czechia"]); //set

  const select = (country) => {
    let x = new Set(selectedCountries);
    x.add(country);
    setSelectedCountries(x);
  };

  const unselect = (country) => {
    let x = new Set(selectedCountries);
    x.delete(country);
    setSelectedCountries(x);
  };

  const onSelect = (event, isSelected, rowID) => {
    const modify = isSelected ? select : unselect;
    if (rowID === -1) {
      return;
    }
    const stat = rady[rowID][0];
    modify(stat);
    rady[rowID].selected = isSelected;
  };
  const toggleTableMode = () => {
    setTableMode(!tableMode);
  };

  async function fetchData() {
    const res = await fetch("https://pomber.github.io/covid19/timeseries.json");
    console.log("spadne", res);
    res.json().then((res) => setKoronaData(res));
  }
  // const loading = false;
  // const user = false;
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
    return direction * (b[index-1] < a[index-1] ? 1 : -1);
  };
  const onSetPage = (_event, page) => {
    setPage(page);
  };

  const onSetPerPage = (_event, perPage) => {
    setItems(perPage);
  };
    const cele = koronaDedToday(koronaData)
        .filter((x) => x[0].toLowerCase().includes(countryFilter.toLowerCase()))
        .sort(sortFunc)
    const paga = cele.length < page * items - items ? 1 : page
    const rady = cele.slice(paga * items - items, paga * items);
    return (
    <Fragment>
      <div style={{ float: "left", width: "30%"}}>
        <Switch id="tableSwitch" label={"Table mode"} labelOff="Graph mode" isChecked={tableMode} onChange={toggleTableMode} />
      </div>
      {koronaData !== {} && console.log("koronky jsou", koronaDedToday(koronaData))}
      {koronaData !== {} && (
          <div style={{float : "right"}}>
        <Pagination itemCount={Object.keys(cele).length} perPage={items} page={paga} onSetPage={onSetPage} onPerPageSelect={onSetPerPage} />
        </div>
      )}

      <div style={{ float:"left", width:"auto"}}>
        <TextInput type="text" onChange={setCountryFilter} placeholder="search country..." aria-label="search country" />
      </div>
        <br />
      <br />
      <div style={{ float: "left", width: "30%" }}>
        <img src="https://cdn.pixabay.com/photo/2020/03/31/14/04/covid-19-4987797_960_720.jpg" alt="" style={{ float: "left" }} />
        <img
          src="https://i.redd.it/q4dgjo77y6n41.jpg"
          alt='When you find out your daily lifestyle is called "quarantine"'
          style={{ float: "left" }}
        />
      </div>
        {koronaData !== {} && tableMode && (
            <div style={{ float: "right", width: "70%" }}>
            {
              <Tabulka
                rows={rady}
                onSort={onSort}
                onSelect={onSelect}
                selected={selectedCountries}
              />
            }
            </div>
        )}

        {koronaData !== {} && !tableMode && <div style={{ float: "right", width: "70%" , height: "70%"}}><CoronaChart koronky={Object.keys(koronaData).filter((x) => selectedCountries.has(x)).map((country)=> {console.log(koronaData[country]); return [country, koronaData[country]]})} /></div>}
    </Fragment>
  );
};

export default Home;
