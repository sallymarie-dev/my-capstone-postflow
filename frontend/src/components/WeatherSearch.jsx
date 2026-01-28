import React, { useState, useEffect } from "react";

export default function WeatherSearch() {
  const [zip, setZip] = useState("10001");
  const [cityInput, setCityInput] = useState("New York"); 
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeather();
  }, []);

  
  useEffect(() => {
    if (zip.length === 5) {
      autoFetchCity(zip);
    }
  }, [zip]);

  const autoFetchCity = async (zipCode) => {
    try {
      const res = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
      if (res.ok) {
        const data = await res.json();
        const foundCity = data.places[0]["place name"];
        const foundState = data.places[0]["state abbreviation"];
        setCityInput(`${foundCity}, ${foundState}`);
      }
    } catch (err) {
      console.log("Could not auto-resolve city");
    }
  };

  const fetchWeather = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/get-weather?zip=${zip}&date=${date}`
      );
      const data = await response.json();

      if (response.ok && data.length > 0) {
        setWeather(data[0]);
      } else {
        setWeather(null);
      }
    } catch (err) {
      console.error("Weather component error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-widget" style={{ margin: "20px auto", maxWidth: "600px" }}>
      <form 
        onSubmit={fetchWeather} 
        style={{ 
          display: "flex", 
          gap: "12px", 
          justifyContent: "center", 
          flexWrap: "wrap",
          padding: "10px" 
        }}
      >
        <input
          type="text"
          className="name-box"
          style={{ width: "100px", marginBottom: "0px" }}
          placeholder="Zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
        />
       
        <input
          type="text"
          className="name-box"
          style={{ width: "160px", marginBottom: "0px" }}
          placeholder="City Name"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <input
          type="date"
          className="name-box"
          style={{ width: "150px", marginBottom: "0px" }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" className="btn" style={{ padding: "10px 20px" }}>
          {loading ? "..." : "Check Weather"}
        </button>
      </form>

      <div style={{ marginTop: "20px", textAlign: "center", minHeight: "30px" }}>
        {loading ? (
          <p>Loading weather...</p>
        ) : weather ? (
          <div className="weather-result" style={{ padding: "10px" }}>
            <h4 style={{ marginBottom: "8px", color: "#444", fontStyle: "italic" }}>
              🌡️ Temperature changes your mood often. 🌡️
            </h4>
            <p style={{ fontSize: "18px", margin: "5px 0" }}>
              It's <strong>{weather.temp}°F</strong> in <strong>{cityInput || zip}</strong>
            </p>
            <small style={{ opacity: 0.7 }}>Date: {weather.datetime}</small>
          </div>
        ) : (
          <p style={{ opacity: 0.6 }}>Enter details to see the weather</p>
        )}
      </div>
    </div>
  );
}