import {Diary} from '../types';

export class DiaryDataStore {
  diaries: {[key: number]: Diary};
  id: number;
  constructor() {
    this.diaries = {}; // We will store our entries in an object for quick operations
    this.id = 1; // We'll increment this to create id for new entries
  }

  // This method will return to us all Diary entries in an array
  getDiaries(): Diary[] {
    return Object.values(this.diaries);
  }

  // We retrieve a Diary entry with the given id
  getDiaryById(id: number): Diary {
    return this.diaries[id];
  }

  // We assign an id and save the diary here
  createDiary(diary: Diary): Diary {
    diary.id = this.id;
    this.diaries[this.id] = diary;
    this.id++;
    return diary;
  }
}
