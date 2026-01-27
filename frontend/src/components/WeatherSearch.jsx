import React, { useState, useEffect } from "react"; // Added useEffect import

export default function WeatherSearch() {
  const [zip, setZip] = useState("10001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  // Auto-fetch on mount
  useEffect(() => {
    fetchWeather(); // Fixed: called the correct function name
  }, []);

  const fetchWeather = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/get-weather?zip=${zip}&date=${date}`
      );
      const data = await response.json();

      if (response.ok) {
        // Since your microservice returns an array of days
        setWeather(data[0]);
      } else {
        console.error(data.error || "Weather search failed");
        setWeather(null);
      }
    } catch (err) {
      console.error("Weather component error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-widget" style={{ margin: "20px auto", maxWidth: "500px" }}>
      <form onSubmit={fetchWeather} style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
        <input
          type="text"
          className="name-box"
          style={{ width: "120px", marginBottom: 0 }}
          placeholder="Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          required
        />
        <input
          type="date"
          className="name-box"
          style={{ width: "160px", marginBottom: 0 }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit" className="btn" style={{ padding: "8px 16px" }}>
          {loading ? "Updating..." : "Check Weather"}
        </button>
      </form>

      <div style={{ marginTop: "15px", textAlign: "center", minHeight: "24px" }}>
        {loading ? (
          <p>Loading weather...</p>
        ) : weather ? (
          <p>
            <h3>
            🌡️Temperature changes your mood often. Here's the temp the area🌡️</h3><strong>{weather.temp}°F</strong> in {zip} on {weather.datetime}
          </p>
        ) : (
          <p style={{ opacity: 0.6 }}>Enter details to see the weather</p>
        )}
      </div>
    </div>
  );
}