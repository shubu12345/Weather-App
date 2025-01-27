import React, { useEffect, useState } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import "./WeatherData.css";

export default function WeatherData({ theme }) {
  const [city, setCity] = theme;
  const [current, setCurrent] = useState("");
  const [weather, setWeather] = useState("");
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState("");

  function getCoordintes() {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      var lat = crd.latitude.toString();
      var lng = crd.longitude.toString();
      var coordinates = [lat, lng];
      //   console.log(`Latitude: ${lat}, Longitude: ${lng}`);
      getCity(coordinates);
      return;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  // Step 2: Get city name
  function getCity(coordinates) {
    var xhr = new XMLHttpRequest();
    var lat = coordinates[0];
    var lng = coordinates[1];
    const API_KEY = "pk.54f653d31f71f441f9b3b51de62c9a82";
    // Paste your LocationIQ token below.
    xhr.open(
      "GET",
      `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${lat}&lon=${lng}&format=json`,
      true
    );
    xhr.send();
    xhr.onreadystatechange = processRequest;
    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = JSON.parse(xhr.responseText);
        var city = response.address.city;
        setCity(city);
      }
    }
  }

  useEffect(() => {
    getCoordintes();
  }, []);

  if (city) {
    const API_KEY = "6f70e8e404db97030a285fccaec535b8";
    const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    async function getData() {
      const response = await fetch(Url);
      const result = await response.json();

      if (response.ok) {
        setCity(result);
      }
    }
    getData();
  }

  function getInputData(e) {
    setCurrent(e.target.value);
    setPreview("true");
  }
  const API_KEY = "6f70e8e404db97030a285fccaec535b8";
  const dd = `https://api.openweathermap.org/data/2.5/weather?q=${current}&units=metric&appid=${API_KEY}`;

  async function getAllCity() {
    const data = await fetch(dd);
    const output = await data.json();
    if (data.ok) {
      setWeather(output);
      setError("");
    } else {
      setError("NoT Found! Please enter the correct city.");
    }
  }

  return (
    <>
      <div className="main-container">
        <div className="input-container">
          <input
            onChange={getInputData}
            value={current}
            type="text"
            placeholder="enter you city name.."
          />
          <div onClick={getAllCity} className="search-icon">
            <FaSearch />
          </div>
        </div>
        {city && city.weather && (
          <div className={`content ${preview ? "true" : ""}`}>
            <div className="weather-img">
              <img
                src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                alt="img"
              />
              <h3 className="desc">{city.weather[0].description}</h3>
            </div>
            <div className="weather-temp">
              <h2>
                {city.main.temp}

                <span>&deg;C</span>
              </h2>
            </div>
            <div className="city-name">
              <div className="location-img">
                <MdLocationOn />
              </div>
              <p>
                {city.name}, {city.sys.country}
              </p>
            </div>
            <div className="weather-state">
              <div className="wind">
                <div className="wind-icon">
                  <FaWind />
                </div>
                <h3 className="wind-speed">{city.wind.speed}km/h</h3>
                <h3 className="wind-heading">Wind Speed</h3>
              </div>
              <div className="humidity">
                <div className="humidity-icon">
                  <WiHumidity />
                </div>
                <h3 className="humidity-text">
                  {city.main.humidity}
                  <span>%</span>
                </h3>
                <h3 className="humidity-heading">Humidity</h3>
              </div>
            </div>
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        {weather && weather.weather && (
          <div className="content">
            <div className="weather-img">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="img"
              />
              <h3 className="desc">{weather.weather[0].description}</h3>
            </div>
            <div className="weather-temp">
              <h2>
                {weather.main.temp}

                <span>&deg;C</span>
              </h2>
            </div>
            <div className="city-name">
              <div className="location-img">
                <MdLocationOn />
              </div>
              <p>
                {weather.name}, {weather.sys.country}
              </p>
            </div>
            <div className="weather-state">
              <div className="wind">
                <div className="wind-icon">
                  <FaWind />
                </div>
                <h3 className="wind-speed">{weather.wind.speed}km/h</h3>
                <h3 className="wind-heading">Wind Speed</h3>
              </div>
              <div className="humidity">
                <div className="humidity-icon">
                  <WiHumidity />
                </div>
                <h3 className="humidity-text">
                  {weather.main.humidity}
                  <span>%</span>
                </h3>
                <h3 className="humidity-heading">Humidity</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
