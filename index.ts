import {DiaryApp} from './src/app';
import {RestServer} from '@loopback/rest';

(async function main() {
  const app = new DiaryApp();

  await app.start().catch(err => {
    console.error('Cannot start the application! ', err);
    process.exit(1);
  });

  const server = await app.getServer(RestServer);
  const port = await server.get('rest.port');

  console.log(`Application started at localhost:${port}`);
})();
