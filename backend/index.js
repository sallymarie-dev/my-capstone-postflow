import express from "express";
import "dotenv/config";
import cors from "cors";
import supabase from "./supabase.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => res.json({ message: "PostFlow API running" }));

// CREATE a new user quote
app.post("/user_profile", async (req, res) => {
  const { name, quote } = req.body;
  if (!name || !quote)
    return res.status(400).json({ error: "Name and quote required" });
  // console.log(`new quote request from :${name}`);
try{
  const profileInsert = await supabase
    .from("user_profile")
    .insert([{ name, quote }])
    .select()
    .single();
const feedInsert = await supabase
      .from("post_flow")
      .insert([{ author: name, quote: quote }]);

 if (profileInsert.error) throw profileInsert.error;
    if (feedInsert.error) throw feedInsert.error;

    res.status(201).json({ message: "Successfully added to Profile and Feed" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: err.message });
  }
});

// READ all user quotes
app.get("/user_profile", async (req, res) => {
  const { data, error } = await supabase
    .from("user_profile")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// READ a single user quote by ID
app.get("/user_profile/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("user_profile")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// UPDATE a user quote
app.put("/user_profile/:id", async (req, res) => {
  const { id } = req.params;
  const { name, quote } = req.body;

  const { data, error } = await supabase
    .from("user_profile")
    .update({ name, quote })
    .eq("id", id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// DELETE a user quote
app.delete("/user_profile/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("user_profile")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: `Deleted user quote ${id}`, deleted: data });
});

// CREATE a new post
app.post("/posts", async (req, res) => {
  const { author, quote } = req.body;
  if (!author || !quote)
    return res.status(400).json({ error: "Author and quote required" });

  const { data, error } = await supabase
    .from("post_flow")
    .insert([{ author, quote }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// READ all posts
app.get("/posts", async (req, res) => {
  const { data, error } = await supabase
    .from("post_flow")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// READ single post by ID
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("post_flow")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// UPDATE a post
app.put("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { author, quote } = req.body;

  const { data, error } = await supabase
    .from("post_flow")
    .update({ author, quote })
    .eq("id", id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// DELETE a post
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("post_flow")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: `Deleted post ${id}`, deleted: data });
});

// Save a post to user favorites
app.post("/favorites", async (req, res) => {
  const { user_name, post_id, quote } = req.body;
  if (!user_name || !post_id)
    return res.status(400).json({ error: "user_name and post_id required" });

  // Check duplicates
  const { data: existing, error: checkError } = await supabase
    .from("user_favorites")
    .select("*")
    .eq("user_name", user_name)
    .eq("post_id", post_id);

  if (checkError) return res.status(500).json({ error: checkError.message });
  if (existing.length > 0)
    return res.status(409).json({ error: "Already saved" });

  const { data, error } = await supabase
    .from("user_favorites")
    .insert([{ user_name, post_id, quote }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// Get all favorites for a user
app.get("/favorites/:user_name", async (req, res) => {
  const { user_name } = req.params;
  const { data, error } = await supabase
    .from("user_favorites")
    .select("post_id, post_flow(*)")
    .eq("user_name", user_name)
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data.map((d) => d.post_flow));
});


app.get("/get-weather", async (req, res) => {
  const { zip, date } = req.query;
  const WEATHER_SERVICE_URL = "http://localhost:3001/weather";
  const SERVICE_KEY = process.env.SERVICE_KEY; 
  try {
    const response = await fetch(`${WEATHER_SERVICE_URL}?zip=${zip}&date=${date}`, {
      method: "GET",
      headers: {
        "x-api-key": SERVICE_KEY, 
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const weatherData = await response.json();
    res.json(weatherData);
  } catch (error) {
    console.error("Failed to connect to weather service:", error);
    res.status(500).json({ error: "Could not reach weather microservice" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
