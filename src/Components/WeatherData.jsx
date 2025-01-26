import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";
import './WeatherData.css'
import { useState } from "react";


const WeatherData = () => {
const [city, setCity] = useState('');
const [weather, setWeather] = useState('');
const [error, setError] = useState('')

const API_KEY = '6f70e8e404db97030a285fccaec535b8';
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

   function getInputData(e){
   setCity(e.target.value)
   }

   async function fetchData(){
    try{
        const response = await fetch(url);
        const result = await response.json();
        if(response.ok){
            setWeather(result)
            console.log(result);
            setError("")
        }else{
            setError("Not Found!, Enter the correct city name")
        }
    }catch(error){
        console.log(error.message)
    }
   }

    return (
        <>
        <div className="main-container">
            <div className="input-container">
        <input type="text" value={city} onChange={getInputData} placeholder="enter you city name.."/>
        <div onClick={() => fetchData()} className="search-icon">
        <FaSearch/>
        </div>
        </div>
        {
            error && <p className="error-message">{error}</p>
        }
        {
           weather && weather.weather && 
           <div className="content">
                <div className="weather-img">
                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='img' />
                <h3 className="desc">{weather.weather[0].description}</h3>
                </div>
                <div className="weather-temp">
                    <h2>{weather.main.temp}<span>&deg;C</span></h2>
                </div>
                <div className="city-name">
                    <div className="location-img">
                   <MdLocationOn /> 
                   </div>
                   <p>{weather.name}, {weather.sys.country}</p>
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
                        <h3 className="humidity-text">{weather.main.humidity}<span>%</span></h3>
                        <h3 className="humidity-heading">Humidity</h3>
                    </div>
                </div>
           </div>
        }
        </div>
        </>
    )
}

export default WeatherData;