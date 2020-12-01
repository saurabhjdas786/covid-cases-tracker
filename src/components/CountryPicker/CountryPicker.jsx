/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

const CountryPicker = ({ setSelectedCountry }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    (async () => {
      setCountries(await fetchCountries());
    })();
  }, [setCountries]);

  return countries.length ? (
    <div className={styles.container}>
      <FormControl className={styles.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={e => {
            setSelectedCountry(e.target.value);
          }}
        >
          <option value="">Global</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  ) : null;
};

export default CountryPicker;
