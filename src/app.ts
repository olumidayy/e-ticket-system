import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import express from 'express';

async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, () => {
    console.info(`
      Server listening on port: ${config.port}.
    `);
  }).on('error', err => {
    console.error(err);
    process.exit(1);
  });

}

startServer();
