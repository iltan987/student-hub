import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json({limit: '5mb'}));

app.use(cors())

app.use('/api', router);

export default app;