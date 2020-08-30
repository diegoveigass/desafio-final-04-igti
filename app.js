import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from './models/index.js';

import { gradeRouter } from './routes/gradeRouter.js';

(async () => {
  try {
    console.log('Conectando ao banco de dados MongoDB...');
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('Conectado com sucesso...');
  } catch (error) {
    console.log(error);
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(gradeRouter);
app.get('/', (req, res) => {
  res.send('API em execucao');
});

app.listen(process.env.PORT || 3333, () => {
  console.log('API Executou');
});
