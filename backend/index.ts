import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import config from './config';


const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('')

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Port: ${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();
