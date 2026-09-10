import app from './app';
import mongoConnect from './utils/db';

const port = 3000;

const start = async () => {
  await mongoConnect();

  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
};

start();