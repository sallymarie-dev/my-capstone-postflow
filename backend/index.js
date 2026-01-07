import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { supabase } from './supabase.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'PostFlow API is running' });
});

// CREATE A NEW QUOTE
app.post('/posts', async (req, res) => {
  const { author, quote } = req.body;

  if (!author || !quote) {
    return res.status(400).json({ error: 'Author and quote are required' });
  }

  const { data, error } = await supabase
    .from('posts')
    .insert([{ author, quote }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

app.get('/posts', async (req, res) => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

//  GET SINGLE QUOTE BY ID
app.get('/posts/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single(); // gets just one row

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// ✅ DELETE QUOTE BY ID
app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ message: `Quote with id ${id} deleted.`, deleted: data[0] });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
