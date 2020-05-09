import React from "react";
import Instructions from "../src/components/Instructions";
import {format} from "date-fns";
import {Link} from "react-router-dom";

import {BASE_URL} from "./services/baseUrl";

const Home = () => {
  const [results, setResults] = React.useState([]);
  const [countries, setCountries] = React.useState([]);
  const [countrySelected, setSelectedCountry] = React.useState("");
  const [apply, setApply] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [hasGeo, setHasGeo] = React.useState(false);
  const [date, setDate] = React.useState(format(new Date("2000-01-01"), "yyyy-MM-dd"));
  const [filtersApplied, setFiltersApplied] = React.useState({
    countrySelected: null,
    hasGeo: null,
    date: null,
  });

  React.useEffect(() => {
    fetch(`${BASE_URL}/latest?limit=${limit}&page=${page}`).then(res => {
      res.json().then(result => {
        setResults(result.results);
      });
    });

    fetch(`${BASE_URL}/countries`).then(res => {
      res.json().then(result => {
        setCountries(result.results);
        setSelectedCountry(result.results[0].code);
      });
    });
  }, []);

  const updateResults = () => {
    let queryString = "";
    queryString += countrySelected && `country=${countrySelected}&order_by=locations`;
    queryString += page && `&page=${page}&limit=${limit}`;
    queryString += hasGeo && `&hasGeo=${true}`;
    queryString += date && `&date_from=${date}`;

    setFiltersApplied({
      countrySelected: countrySelected !== "" ? countrySelected : null,

      hasGeo: hasGeo ? hasGeo : null,
      date: date !== "" ? date : null,
    });
    fetch(`${BASE_URL}/latest?${queryString}`).then(res => {
      res.json().then(result => {
        setResults(result.results);
        setApply(false);
      });
    });
  };

  React.useEffect(() => {
    if (apply) {
      updateResults();
    }
  }, [apply]);

  React.useEffect(() => {
    updateResults();
  }, [page, limit]);

  const onFilterClose = item => {
    if (item === "hasGeo") {
      setHasGeo(false);
    } else if (item === "countrySelected") {
      setSelectedCountry("");
    } else if (item === "date") {
      setDate("");
    }
    updateResults();
  };

  return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <li>
        <Link to="/instructions">Instructions</Link>
      </li>
      <Instructions />
      <div style={{padding: "1.3rem"}}>
        <h4> Applied Filters</h4>
      </div>
      <div className="filters">
        {Object.keys(filtersApplied).map(item => {
          if (filtersApplied[item]) {
            return (
              <FilterChipItem
                filterItem={item}
                filterValue={`${filtersApplied[item]}`}
                onClose={onFilterClose}
              />
            );
          } else {
            return null;
          }
        })}
      </div>

      <div style={{display: "flex"}} className="site_container">
        <div className="site_form">
          <div className="site_form_item">
            <label htmlFor="country"> Country : {countrySelected}</label>
            <select
              id="country"
              name="country"
              value={countrySelected}
              onChange={e => {
                setSelectedCountry(e.target.value);
              }}
              style={{maxWidth: "100%"}}
            >
              {countries.map((country, idx) => (
                <option key={country.code + idx} value={country.code}>
                  {country.name}{" "}
                </option>
              ))}
            </select>
          </div>

          <div className="site_form_item">
            <div>
              <input
                type="checkbox"
                checked={hasGeo}
                id="hasgeo"
                name="hasgeo"
                onChange={e => {
                  setHasGeo(e.target.checked);
                }}
              />
              <label htmlFor="hasgeo" style={{display: "inline"}}>
                {" "}
                Has Geographic information
              </label>
            </div>
          </div>

          <div className="site_form_item">
            <label htmlFor="fromDate"> From Date</label>
            <input
              type="date"
              value={date.toString()}
              id="fromdate"
              name="fromdate"
              onChange={e => {
                setDate(e.target.value);
              }}
            />
          </div>
          <div style={{marginTop: 15}} className="site_form_item">
            <button
              onClick={() => {
                setPage(1);
                setApply(true);
              }}
            >
              apply filter{" "}
            </button>
          </div>
        </div>
        <div style={{display: "flex", flexDirection: "column"}} className="site_data">
          <div>
            {results.map((item, idx) => (
              <div
                key={item.country + idx}
                style={{
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid grey",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "7px",
                  }}
                >
                  {" "}
                  <div> city:{item.city} </div>
                  <div> country:{item.country} </div>
                  <div> location:{item.location} </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {item.measurements.map((item, idx) => (
                    <MeasurementItem
                      key={idx}
                      parameter={item.parameter}
                      value={item.value}
                      unit={item.unit}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="main_footer_area">
            <div className="button_area">
              <button
                onClick={() => {
                  if (page - 1 > 0) {
                    setPage(page - 1);
                  }
                }}
              >
                {" "}
                Previous
              </button>
              <div>
                {" "}
                <span> Page: {page}</span>
              </div>
              <button
                onClick={() => {
                  if (page + 1 > 0) {
                    setPage(page + 1);
                  }
                }}
              >
                {" "}
                Next Page
              </button>{" "}
            </div>

            <div className="limit_area">
              <div>
                {" "}
                <label htmlFor="limit"> Limit</label>
                <select
                  id="limit"
                  name="limit"
                  value={limit}
                  onChange={e => {
                    setLimit(e.target.value);
                  }}
                >
                  <option value={10}>10 </option>
                  <option value={15}>15 </option>
                  <option value={20}>20 </option>
                  <option value={30}>30 </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MeasurementItem = ({parameter, value, unit}) => {
  return (
    <div>
      {parameter} : {value} {unit}
    </div>
  );
};

const FilterChipItem = ({filterItem, filterValue, onClose}) => {
  return (
    <div className="filter-chip">
      <div>
        {filterItem}: {filterValue}
      </div>
      <div>
        {" "}
        <button onClick={() => onClose(filterItem)}> X</button>
      </div>
    </div>
  );
};

export default Home;
