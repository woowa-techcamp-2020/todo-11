import express, {Request, Response} from 'express';
import loader from './loaders';
import api from './api';

const app = express();

loader(app);
app.use('/', api);

export default app;