import express, {Request, Response} from 'express';
import api from './api';

const app = express();


app.use('/', api);

app.listen(3000, () => {
    console.log("example app listen on port 3000!");
});