/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";

import styles from "./App.module.css";

import { fetchData } from "./api";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      setData(await fetchData());
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Cards {...data} />
      <Chart />
      <CountryPicker />
    </div>
  );
}

export default App;
