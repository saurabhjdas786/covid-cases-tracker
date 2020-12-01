import axios from "axios";

const URL = "https://covid19.mathdro.id/api";

export const fetchData = async country => {
  let newURL = URL;
  if (country) newURL = `${newURL}/countries/${country}`;
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(newURL);
    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${URL}/daily`);
    const processedData = data.map(dailyData => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));
    return processedData;
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${URL}/countries`);
    return countries.map(country => country.name);
  } catch (error) {
    return error;
  }
};
