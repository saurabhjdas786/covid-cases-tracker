/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import { fetchData } from "./api";
import coronaBanner from "./images/corona-banner2.jpg";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { Grid, Paper, Switch, Typography } from "@material-ui/core";
import bulbOn from "./images/icon/light.svg";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [data, setData] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");

  const darkThemeUI = createMuiTheme({
    palette: {
      type: "dark",
      background: {
        paper: "#1a1919",
      },
      grey: "red",
      primary: {
        main: "#fff",
      },
    },
  });

  const lightThemeUI = createMuiTheme({
    palette: {
      type: "light",
      background: {
        paper: "#fff",
      },
      primary: {
        main: "#fff",
      },
    },
  });

  useEffect(() => {
    (async () => {
      setData(await fetchData(selectedCountry));
    })();
  }, [selectedCountry]);

  useEffect(() => {}, [selectedCountry]);

  return (
    <ThemeProvider theme={isDarkTheme ? darkThemeUI : lightThemeUI}>
      <Paper>
        <div className={styles.container}>
          <img
            className={styles.coronaBanner}
            src={coronaBanner}
            alt="Coronavirus Banner"
          />
          <Typography component="div">
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>
                <img
                  src={bulbOn}
                  alt="light theme on"
                  width="35px"
                  height="35px"
                />
              </Grid>
              <Grid item>
                <Switch
                  checked={isDarkTheme}
                  onChange={() => {
                    setIsDarkTheme(!isDarkTheme);
                  }}
                />
              </Grid>
            </Grid>
          </Typography>
          <Cards {...data} />
          <CountryPicker setSelectedCountry={setSelectedCountry} />
          <Chart {...data} selectedCountry={selectedCountry} />
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
