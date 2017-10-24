import {get, post, param, operation, RestBindings} from '@loopback/rest';
import {inject} from '@loopback/core';
import {ServerResponse} from 'http';
import {Diary, diarySchema} from '../types';
import {DiaryDataStore} from '../datastores/diary.datastore';

export class DiaryController {
  constructor(
    @inject('datastores.diary') public diaryStore: DiaryDataStore,
    @inject(RestBindings.Http.RESPONSE) public res: ServerResponse,
  ) {}

  // Get all diary entries from datasource
  @get('/')
  getDiaries(): Diary[] {
    return this.diaryStore.getDiaries();
  }

  // Get Diary Entry for given ID
  @get('/{id}')
  @param.path.number('id')
  getDiaryById(id: number): Diary {
    return this.diaryStore.getDiaryById(id);
  }

  // Create New Diary Entry
  @post('/')
  @param.body('diary', diarySchema) // User should provide us JSON matching this schema we defined earlier
  createDiary(diary: any): Diary {
    return this.diaryStore.createDiary(diary);
  }

  // Options request for pre-flight requests. This is needed for CORS for when we test our API's.
  @operation('OPTIONS', '/')
  optionsHeader() {
    this.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers',
    );
  }
}
