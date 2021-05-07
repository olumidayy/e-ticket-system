import { Application } from 'express';

import expressLoader from './express';
import mongooseLoader from './mongoose';
import dependencyInjectorLoader from './dependencyInjection';

export default async ({ expressApp } : { expressApp: Application }) => {
  const mongoConnection = await mongooseLoader();
  console.info('✌️ DB loaded and connected!');

  await expressLoader({ app: expressApp });
  console.info('✌️ Express loaded');

  let models: any = [
    {
      name: 'userModel',
      model: require('../models/user')
    }
  ];

  await dependencyInjectorLoader({ models })
};
