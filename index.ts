import {Application} from '@loopback/core';
import {RestComponent, get} from '@loopback/rest';

class DiaryController {
  @get('/')
  helloWorld() {
    return 'Hello LoopBack';
  }
}

class DiaryApp extends Application {
  constructor() {
    super({
      components: [RestComponent],
    });

    this.controller(DiaryController);
  }
}

async function main() {
  const app = new DiaryApp();
  await app.start();
  console.log('App started');
}

main();
