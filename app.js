import 'dotenv/config.js';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from './models/index.js';
import gradeRouter from './routes/gradeRouter.js';

db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(gradeRouter);

app.listen(process.env.PORT, () => {
  console.log('API Executou');
});
