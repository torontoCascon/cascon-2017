import {get} from '@loopback/rest';

export class DiaryController {
  @get('/')
  helloWorld() {
    return 'Hello LoopBack';
  }
}
