/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import app from './app.js';

const dirnameVar = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(dirnameVar, '/.env') });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASS,
);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('db connection succesful');
}).catch((err) => console.error(err));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
