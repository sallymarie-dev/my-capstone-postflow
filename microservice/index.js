import "dotenv/config";
import express from "express";

const app = express();
const PORT = 3001;

const myAPIKey = process.env.myAPIKey;
const SERVICE_KEY = process.env.SERVICE_KEY;

// Simple cache
const weatherCache = {};

app.get("/", (req, res) => {
  res.json({ message: "weather microservice is running!!" });
});

app.get("/weather", async (req, res) => {
  try {
    //  API key check FIRST
    const clientKey = req.headers["x-api-key"];
    if (!clientKey || clientKey !== SERVICE_KEY) {
      return res.status(401).json({ error: "Not authorized" });
    }

    //  Query params
    const { zip, date } = req.query;

    if (!zip) return res.status(400).json({ error: "zip is required" });
    if (!date) return res.status(400).json({ error: "date is required" });

    //  Cache key
    const cacheKey = `${zip}-${date}`;

    //  Cache check
    if (weatherCache[cacheKey]) {
      console.log("Cache hit:", cacheKey);
      return res.json(weatherCache[cacheKey]);
    }

    console.log("Cache miss:", cacheKey);

    // Fetch from Visual Crossing
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zip}/${date}?key=${myAPIKey}&contentType=json`;

    const response = await fetch(url);
    if (!response.ok) {
      return res.status(500).json({ error: "Weather API failed" });
    }

    const data = await response.json();

    const days = data.days.map((day) => ({
      datetime: day.datetime,
      temp: day.temp,
    }));

    //  Store in cache
    weatherCache[cacheKey] = days;

    res.json(days);
  } catch (err) {
    console.error("Weather service error:", err);
    res.status(500).json({ error: " server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Weather Microservice running on port ${PORT}`);
});

export default app;
