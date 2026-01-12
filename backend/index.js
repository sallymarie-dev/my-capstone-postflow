import express from "express";
import "dotenv/config";
import cors from "cors";
import supabase from "./supabase.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => res.json({ message: "PostFlow API running" }));

// =================== USER PROFILE ===================
// Create user quote
app.post("/user_profile", async (req, res) => {
  const { name, quote } = req.body;
  if (!name || !quote) return res.status(400).json({ error: "Name and quote required" });

  const { data, error } = await supabase
    .from("user_profile")
    .insert([{ name, quote }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// Get all user quotes (newest first)
app.get("/user_profile", async (req, res) => {
  const { data, error } = await supabase
    .from("user_profile")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// =================== POST FLOW ===================
// Get all posts (read-only)
app.get("/posts", async (req, res) => {
  const { data, error } = await supabase
    .from("post_flow")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
