import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from '@/router';
import { errorHandler, notFoundHandler } from './common';
import { ConfigKeysEnum, getConfig, json } from './utils';

const app = express();

app.response.json = json;

app.use(helmet());

app.use(express.json());
app.use(cors());

app.use(getConfig<string>(ConfigKeysEnum.URL_PREFIX) || '', router);

app.use(notFoundHandler);
app.use(errorHandler);

export { app };
