import {get, post, param, operation, RestBindings} from '@loopback/rest';
import {inject} from '@loopback/core';
import {ServerResponse} from 'http';
import {Diary, diarySchema} from '../types';
import {DiaryDataStore} from '../datastores/diary.datastore';
import {Promise} from 'bluebird';
import {ToneAnalyzerV3} from 'watson-developer-cloud';

export class DiaryController {
  tone_analyzer: any;

  constructor(
    @inject('datastores.diary') public diaryStore: DiaryDataStore,
    @inject(RestBindings.Http.RESPONSE) public res: ServerResponse,
    @inject('tone_analyzer.username') username: string,
    @inject('tone_analyzer.password') password: string,
    @inject('tone_analyzer.version') version: string,
  ) {
    this.tone_analyzer = new ToneAnalyzerV3({
      username: username,
      password: password,
      version_date: version,
    });

    this.tone_analyzer.tone = Promise.promisify(this.tone_analyzer.tone);
  }

  // Get all diary entries from datasource
  @get('/')
  @param.query.string('tone')
  getDiaries(tone?: string): Diary[] {
    const diaries = this.diaryStore.getDiaries();
    if (!tone) return diaries;

    tone = tone.toLowerCase();
    let result: any = [];
    for (const diary of diaries) {
      for (const diaryTone of diary.tones) {
        if (diaryTone.tone_name.toLowerCase() === tone) {
          result.push(diary);
          break;
        }
      }
    }
    return result;
  }

  // Get Diary Entry for given ID
  @get('/{id}')
  @param.path.number('id')
  getDiaryById(id: number): Diary {
    return this.diaryStore.getDiaryById(id);
  }

  // Create New Diary Entry
  @post('/')
  @param.body('diary', diarySchema)
  async createDiary(diary: any) {
    const tone = await this.tone_analyzer.tone({text: diary.post});
    diary.tones = tone.document_tone.tones;

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
