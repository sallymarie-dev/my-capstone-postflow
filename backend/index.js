import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { supabase } from './supabase.js';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'PostFlow API is running' });
});

app.post('/posts', async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const { data, error } = await supabase
    .from('posts')
    .insert([{ content }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
