import {Application} from '@loopback/core';
import {RestComponent} from '@loopback/rest';
import {BindingScope} from '@loopback/context';
import {DiaryController} from './controllers/diary.controller';
import {DiaryDataStore} from './datastores/diary.datastore';

export class DiaryApp extends Application {
  constructor() {
    super({
      components: [RestComponent],
    });

    this.controller(DiaryController);
    this.bind('datastores.diary')
      .toClass(DiaryDataStore)
      .inScope(BindingScope.SINGLETON);
  }
}
