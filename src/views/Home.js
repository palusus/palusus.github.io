import React, { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Tabulka from "../components/Tabulka";
import CoronaChart from "../components/CoronaChart";
import { Pagination, TextInput, Switch, Drawer, Button } from "@patternfly/react-core";
import Drawik from "../components/Drawer";
import TimesIcon from "@patternfly/react-icons/dist/js/icons/times-icon";
const koronaDedToday = (koronky) => {
  return !koronky
    ? []
    : Object.keys(koronky).map((country, values) => {
        const today = koronky[country].slice(-2)[0];
        const beforeWeek = koronky[country].slice(-9)[0];
        const terminated = (x) => x["deaths"] + x["recovered"];
        const active = (x) => x["confirmed"] - terminated(x);
        const weekChange = (10000 * active(today)) / active(beforeWeek) - 10000;
        const weekChangeText = /*(weekChange > 0 ? "+" : "")*/ Math.round(weekChange) / 100;
        return [
          country,
          today["confirmed"],
          active(today),
          today["confirmed"] - beforeWeek["confirmed"],
          beforeWeek["confirmed"] < 30 ? "" : weekChangeText,
          today["recovered"],
          today["deaths"],
          Math.round((10000 * terminated(today)) / today["confirmed"]) / 100
        ];
      });
};
const Home = () => {
  const [ loading, setLoading ] = useState(true);
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(10);
  const [direction, setDirection] = useState(-1);
  const [koronaData, setKoronaData] = useState({});
  const [countryFilter, setCountryFilter] = useState("");
  const [filter, setFilter] = useState({});
  const [x, d] = useState(false);
  const [tableMode, setTableMode] = useState(true);
  const [selectedCountries, setSelectedCountries] = useState(new Set()); //["Philippines", "Czechia"])); //["Philippines", "Czechia"]); //set
  const [filterOn, setFilterOn] = useState(false);

  const retarded = !tableMode;

  const resetSelectedCountries = () => setSelectedCountries(new Set());
  const toggleFilterOn = () => setFilterOn(!filterOn);

  const select = (country) => {
    let x = new Set(selectedCountries);
    x.add(country);
    setSelectedCountries(x);
  };

  useEffect(() => {}, [filter]);
  const addFilter = (index, min, max) => {
    let wow = filter;
    wow[index] = [min, max];
    setFilter(wow);
    d(!x);
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
    setLoading(false);
  }
  // const loading = false;
  // const user = false;
  useEffect(() => {
    fetchData();
  }, []);
  const onSort = (_event, index) => {
    setDirection(-direction);
    setIndex(index);
  };
  const sortFunc = (a, b) => {
    return direction * (b[index - 1] < a[index - 1] ? 1 : -1);
  };
  const onSetPage = (_event, page) => {
    setPage(page);
  };

  const onSetPerPage = (_event, perPage) => {
    setItems(perPage);
  };

  const applyFilters = (x) => {
    let result = true;
    Object.keys(filter).map((lol) => {
      const exists = (i) => !(filter[lol][i] === undefined || filter[lol][i] === "");
      [0, 1].map((i) => {
        if (exists(i) && (i ? filter[lol][i] <= x[lol] : filter[lol][i] >= x[lol])) {
          result = false;
        }
      });
    });
    return result;
  };

  const cele = koronaDedToday(koronaData)
    .filter((x) => x[0].toLowerCase().includes(countryFilter.toLowerCase()))
    .filter(applyFilters)
    .sort(sortFunc);
  const paga = cele.length < page * items - items ? 1 : page;
  const rady = cele.slice(paga * items - items, paga * items);

  // const Tab = ({retarded}) =>

  const tab = (
    <div>
      {!retarded && (
          <div style={{ float: "left", width: "28%", margin:"1%"}}>
            <img src="https://cdn.pixabay.com/photo/2020/03/31/14/04/covid-19-4987797_960_720.jpg" alt="" style={{ float: "left" }} />
            <img
                src="https://i.redd.it/q4dgjo77y6n41.jpg"
                alt='When you find out your daily lifestyle is called "quarantine"'
                style={{ float: "left" }}
            />
          </div>
      )}
      {koronaData !== {} && (
        <div style={{ float: "right", width: (retarded?"28%":"68%"), margin:"1%" }}>

          <div style={{ float: "right" }}>
            <Pagination itemCount={Object.keys(cele).length} perPage={items} page={paga} onSetPage={onSetPage} onPerPageSelect={onSetPerPage} />
          </div>
          <div style={{ float: "left" }}>
            <div style={{float: "left", marginRight:5}}>
            <Button variant="danger" aria-label="Remove all selections" onClick={resetSelectedCountries}>
              <input type={"checkbox"} checked={selectedCountries.size !== 0} />
            </Button>
            </div>
            <Button onClick={toggleFilterOn} variant={"secondary"}>
              {filterOn ? "hide" : "show"} filters
            </Button>
            {filterOn && (
                <Button onClick={() => { setCountryFilter(""); setFilter({}) } } variant={"danger"}>
                  reset filters
                </Button>
            )}
          </div>

          <Tabulka
            rows={rady}
            onSort={onSort}
            onSelect={onSelect}
            selected={selectedCountries}
            addFilter={addFilter}
            filter={filter}
            retarded={retarded}
            toggleFilterOn={toggleFilterOn}
            filterOn={filterOn}
            setCountryFilter={setCountryFilter}
          />
      </div>)}
    </div>
  );

  const chart = (
    <Fragment>
      <div style={{ float: "left", width: "68%", height: "70%", margin:"1%"}}>
        <CoronaChart
          koronky={Object.keys(koronaData)
            .filter((x) => selectedCountries.has(x))
            .map((country) => {
              console.log(koronaData[country]);
              return [country, koronaData[country]];
            })}
        />
      </div>
    </Fragment>
  );
  return loading ? (
    ""
  ) : (
    <Fragment>
      <div style={{ width: "28%", margin:"1%"}}>
        {/*<Switch id="tableSwitch" label={"Table mode"} labelOff="Graph mode" isChecked={tableMode} onChange={toggleTableMode} />*/}
        <Button onClick={toggleTableMode}>{tableMode?"Show Graph":"Show Table"}</Button>
      </div>
      {koronaData !== {} && tableMode && tab}
      {koronaData !== {} && !tableMode && (
        <>
          {tab} {chart}
        </>
      )}
    </Fragment>
  );
};

export default Home;
