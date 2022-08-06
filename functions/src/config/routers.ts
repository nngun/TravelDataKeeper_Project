import * as cors from 'cors';
import * as functions from 'firebase-functions';
import helmet from 'helmet';
import apiRouter from '../routes/apiroutes.routes';
import * as express from 'express';

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'Origin',
    'Cache-Control',
    'X-Requested-With',
    'Content-Type',
    'X-Refresh-Token',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  origin: ['http://localhost:4200', 'http://localhost:5000', 'http://localhost:5001', 'https://ctmaps-fd35c.web.app', 'http://ctmaps-fd35c.web.app'],
  preflightContinue: false,
};

function setRoutesAndCors(app: any): void {
  functions.logger.info('Routers loaded to bbapi app');
  app.use(cors(options));
  app.use(express.json());
  app.use(helmet());
  app.use('/api', apiRouter);
}

export default setRoutesAndCors;
