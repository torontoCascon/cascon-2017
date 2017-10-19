import {Application} from '@loopback/core';
import {RestComponent} from '@loopback/rest';
import {DiaryController} from './controllers/diary.controller';

export class DiaryApp extends Application {
  constructor() {
    super({
      components: [RestComponent],
    });

    this.controller(DiaryController);
  }
}
