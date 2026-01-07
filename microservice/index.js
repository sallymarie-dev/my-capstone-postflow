import express from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Microservice is running' });
});

app.listen(PORT, () => {
  console.log(`Microservice running on port ${PORT}`);
});
