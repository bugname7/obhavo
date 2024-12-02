import axios from "axios";
import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [weatherList, setWeatherList] = useState([]);

  const apiKey = "11fd3717469264084e0ba590185671a4";

  function validate() {
    if (name.length < 3) {
      alert("Shahar nomi juda qisqa");
      return false;
    }
    return true;
  }

  // Ob-havo holatini o'zbekchaga tarjima qilish funksiyasi
  function translateWeather(description) {
    const translations = {
      "clear sky": "Ochiq osmon",
      "few clouds": "Biroz bulutli",
      "scattered clouds": "Sochilgan bulutlar",
      "broken clouds": "Bulutli",
      "shower rain": "Jala yomg'ir",
      "rain": "Yomg'ir",
      "thunderstorm": "Momoqaldiroq",
      "snow": "Qor",
      "mist": "Tuman",
    };
    return translations[description] || "Noma'lum ob-havo";
  }

  function handleSearch(event) {
    event.preventDefault();
    const isValid = validate();
    if (isValid) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`
        )
        .then((response) => {
          const newWeather = response.data;

          if (weatherList.some((weather) => weather.name === newWeather.name)) {
            alert("Bu shahar allaqachon mavjud");
          } else {
            setWeatherList([...weatherList, newWeather]);
          }
          setName("");
        })
        .catch((error) => {
          console.log(error);
          alert("Shahar nomi noto‘g‘ri yoki xato yuz berdi");
        });
    }
  }

  function handleRemove(index) {
    const updatedList = weatherList.filter((_, i) => i !== index);
    setWeatherList(updatedList);
  }

  return (
    <div>
      <div className="container">
        <div className="form">
          <h2>Ob-havo ma'lumotlari</h2>
          <form>
            <input
              className="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Shahar nomini kiriting"
            />
            <button className="btnSearch" onClick={handleSearch}>
              Qidirish
            </button>
          </form>
        </div>
        <div className="cards">
          {weatherList.map((weather, index) => (
            <div key={index} className="card">
              <h3>Shahar: {weather.name}</h3>
              <p>Harorat: {weather.main.temp} °C</p>
              <p>Namlik: {weather.main.humidity}%</p>
              <p>Shamol tezligi: {weather.wind.speed} m/s</p>
              <p>
                Ob-havo holati:{" "}
                {translateWeather(weather.weather[0].description)}
              </p>
              <button className="btnClear" onClick={() => handleRemove(index)}>
                O'chirish
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
