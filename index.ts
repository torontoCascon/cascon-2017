import {DiaryApp} from './src/app';
import {RestServer} from '@loopback/rest';

(async function main() {
  const app = new DiaryApp();

  // Catch any startup errors
  try {
    await app.start();
  } catch (err) {
    console.error('Cannot start the application! ', err);
    process.exit(1);
  }

  console.log('App started');
})();
