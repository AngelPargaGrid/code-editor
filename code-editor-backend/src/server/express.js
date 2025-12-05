import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import apiRouter from '../api/index.js';

export function createExpressApp() {
  const app = express();

  app.use(cors());
  app.use(bodyParser.json());

  app.use('/api', apiRouter);

  return app;
}
