import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";



function Forcast(props) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [weather, setWeather] = useState({});
  const [icon, setIcon] = useState('');
  const [weatherDisc, setWeatherDisc] = useState('');

  const search = (city) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city != "[object Object]" ? city : query
        }&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setQuery("");
        setIcon(response.data.weather[0].icon);
        setWeatherDisc(response.data.weather[0].description);
      })
      .catch(function (error) {
        console.log(error);
        setWeather("");
        setQuery("");
        setError({ message: "Not Found", query: query });
      });
  };

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    } // add zero in front of numbers < 10
    return i;
  }

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  useEffect(() => {
    search("Pune");
  }, []);


  return (
    <div className="forecast">
      <div className="today-weather">
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search any city"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />
          <div className="img-box" onClick={search}>
            {" "}
            <img
              src="https://images.avishkaar.cc/workflow/newhp/search-white.png"
            />
          </div>
        </div>
        <div className="forecast-info">
          <h3>{weatherDisc}</h3>
          <div className="forecast-icon">
            <img src={`./icons/${icon}.png`} alt="" />
          </div>
        </div>

        <ul>
          {typeof weather.main != "undefined" ? (
            <div>
              {" "}
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="temp"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                />
              </li>
              <li>
                {" "}
                <p className="temp" id="temp2">
                  {Math.round(weather.main.temp)}°c
                </p>
              </li>
              <li>
                Feel Like  <i class="fa-solid fa-temperature-high"></i>{" "}
                <span className="temp">
                  {Math.round(weather.main.feels_like)} °c
                </span>
              </li>
              <li>
                Humidity <i class="ri-drop-line"></i>{" "}
                <span className="temp">
                  {Math.round(weather.main.humidity)}%
                </span>
              </li>
              <li>
                Visibility <i class="fa-solid fa-eye"></i>{" "}
                <span className="temp">
                  {Math.round(weather.visibility)} mi
                </span>
              </li>
              <li>
                Wind Speed <i class="ri-windy-line"></i>{" "}
                <span className="temp">
                  {Math.round(weather.wind.speed)} Km/h
                </span>
              </li>
              <li>
                Air Pressure{" "}
                <span className="temp">
                  {weather.main.pressure} hPa
                </span>
              </li>
            </div>
          ) : (
            <li>
              {error.query} {error.message}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
export default Forcast;
