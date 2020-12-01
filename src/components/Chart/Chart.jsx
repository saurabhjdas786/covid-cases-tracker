/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Bar, Line } from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = ({ confirmed, recovered, deaths, selectedCountry }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    (async () => {
      setDailyData(await fetchDailyData());
    })();
  }, []);

  const covidLineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "#f00",
            backgroundColor: "rgba(255,0,0,0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const covidBarChart = selectedCountry.length ? (
    <Bar
      data={{
        labels: ["Infected", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Current stats for ${selectedCountry}`,
        },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>
      {selectedCountry ? covidBarChart : covidLineChart}
    </div>
  );
};

export default Chart;
