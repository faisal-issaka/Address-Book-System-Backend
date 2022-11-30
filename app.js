/* eslint-disable import/extensions */
import express, { json, urlencoded } from 'express';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import router from './routes/index.js';

const dirnameVar = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(dirnameVar, './env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', router);

app.listen(PORT);

export default app;
