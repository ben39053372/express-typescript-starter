import "reflect-metadata"

import express from 'express';
import config from './config';
import loader from './loaders';


const setup = async () => {
  const app = express();
  await loader({ expressApp: app });
  app.listen(config.port, () => {
    console.log(`
###########################################
#  [Server] Server started on port ${config.port}!  #
###########################################
      `);
  });
};

setup();
