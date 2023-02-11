import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import router from '@/router';
import { errorHandler, notFoundHandler } from './common';

const app = express();

app.use(helmet());

app.use(express.json());
app.use(cors());

app.use('/', router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
