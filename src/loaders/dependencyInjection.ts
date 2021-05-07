import { Container } from 'typedi';
import config from '../config';

export default ({ models }: { models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    console.info('✌️ Dependencies injected!');

  } catch (e) {
    console.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
