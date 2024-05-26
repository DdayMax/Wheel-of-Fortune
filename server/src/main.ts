import express, { json } from 'express';
import cors from 'cors';

import { usersRouter } from './routes/users.js';
import { sleep } from './sleep.js';

const app = express();
const port = process.env.port || 3000;

app.use(json(), cors(), sleep([400, 1500]));

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
