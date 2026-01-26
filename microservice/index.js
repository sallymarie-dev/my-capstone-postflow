import "dotenv/config";
import express from "express";
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.json({ message: "weather microservice is running!!" });
});
const myAPIKey = process.env.myAPIKey;
app.get("/weather", async (req, res) => {
  const clientKey = req.headers["x-api-key"];
  const validKey = process.env.SERVICE_KEY;
  console.log(`Received key: ${clientKey ? "present" : "missing"}`);
  if (!clientKey || clientKey !== validKey) {
    return res.status(401).json({ error: "Not authorized" });
  }

  const { zip, date } = req.query;
  if (!zip) return res.status(400).json({ error: "zip is required" });
  if (!date) return res.status(400).json({ error: "date is required" });
  console.log(`Fetching weather for ${zip}, ${date}`);
  const result = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${zip}/${date}?key=${myAPIKey}&contentType=json`
  );

  const data = await result.json();
  console.log(data);

  const days = data.days.reduce((resultDays, day) => {
    resultDays.push({
      datetime: day.datetime,
      temp: day.temp,
    });
    return resultDays;
  }, []);

  // const dayData = data.days[0];
  // const weatherDTO = {
  //   date: dayData.datetime,
  //   tempHigh: dayData.tempmax,
  //   tempLow: dayData.tempmin,
  //   conditions: dayData.conditions,
  // };

  const weather = {
    tempHigh: 41,
    tempLow: 28,
    conditions: "windy, icy",
    summary: "Cold chill advisory",
  };
  res.json(days);
});

app.listen(PORT, () => {
  console.log(`Weather Microservice running on port ${PORT}`);
});
export default app;