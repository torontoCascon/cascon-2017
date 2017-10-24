import {SchemaObject} from '@loopback/openapi-spec';

// Diary entry type
export type Diary = {
  title: string;
  post: string;
  id: number;
};

// Diary Schema Object for incoming requests
export const diarySchema: SchemaObject = {
  properties: {
    title: {
      type: 'string',
    },
    post: {
      type: 'string',
    },
  },
};
