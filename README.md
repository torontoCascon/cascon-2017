# cascon-2017
CASCON 2017 Workshop Tutorial

## Overview
This is a tutorial for LoopBack 4 that will show you how to get started creating LoopBack 4 Applications. This will be presented at CASCON 2017. The application we'll be creating is a simple Diary application to write your daily thoughts but we'll get a tone analysis from [Watson Tone Analyzer](https://www.ibm.com/watson/services/tone-analyzer/) for each diary entry to understand your mood and to be able to search for entries by mood.

## Tutorial - Step 04 - Basic Diary Application
1. Let's start making a basic version of our __Diary Application__. Let's start by defining what our `Diary` will look like. Make a file called `types.ts` in the `/src` directory. 

2. In `types.ts` we'll define a `Diary` type and export it. A diary entry will have a `title`, `post`, and an `id`. We can define this as follows:

```ts
// Diary entry type
export type Diary = {
  title: string;
  post: string;
  id: number;
};
```

3. We'll also need to define a `SchemaObject` which explains the __Request__ parameters as per the OpenAPI Specification. So we'll import the `SchemaObject` type from `@loopback/openapi-spec` at the top of our file. Then below our `Diary` type definition, we'll define our `SchemaObject` as follows:

```ts
import {SchemaObject} from '@loopback/openapi-spec';

// Diary entry type BELOW... 
// ... 

// Diary Schema Object for incoming requests.
// Similar to our type object but type defined as a property (vs typescript type)
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
```

4. If you recall, we don't actually have `@loopback/openapi-spec` installed. So before we forget let's install that by running the following command in `terminal`:

```sh
npm i @loopback/openapi-spec
```

5. Now we need a way to save and retrieve our Diary entries. Let's make a class to store our data. We can call this our DataStore. *For this tutorial we'll store the information in memory but in production this should be stored in a database*. Start by making a `datastores` directory in the `/src` directory.

```sh
mkdir datastores
```

6. In the `datastores` directory, we'll create a file called `diary.datastore.ts`. In this file we'll make a class that will allow us to save and retrieve diary entries as follows:

```ts
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
  createDiary(diary: any): Diary {
    diary.id = this.id;
    this.diaries[this.id] = diary;
    this.id++;
    return diary;
  }
}
```

7. Now before we can start using our Diary DataStore, we need to bind it as a Singleton (so multiple requests have the same instance). We'll do this in `/src/app.ts`. Lets start by importing `DiaryDataStore`. We'll also import a `BindingScope` object which defines constants for different Binding Scopes. So lets add the following 2 lines at the top of our file:

```ts
import {BindingScope} from '@loopback/context';
import {DiaryDataStore} from './datastores/diary.datastore';
```

8. Now we'll bind the `DiaryDataStore` to a key `datastores.diary` in the constructor by adding the following line:

```ts
this.bind('datastores.diary').toClass(DiaryDataStore).inScope(BindingScope.SINGLETON);
```

9. Last thing left to update is our `diary.controller.ts`. We'll start by importing our newly created types. To be able to use Dependency Injection we'll also need `inject` from `@loopback/core`. Lastly we'll be creating a POST and OPTIONS request as well so we'll import `post, operation, param, RestBindings` from `@loopback/rest` as well. `RestBindings` gives us access to CONSTANT keys defined by the `rest` package. Your imports should look as follows:

```ts
import {get, post, param, operation, RestBindings} from '@loopback/rest';
import {inject} from '@loopback/core';
import {ServerResponse} from 'http';
import {Diary, diarySchema} from '../types';
import {DiaryDataStore} from '../datastores/diary.datastore';
```

10. Now we'll need to write a constructor since we'll be using Dependecy Injection to inject our DataStore as well as the ServerResponse Object into our controller class as follows:

```ts
export class DiaryController {
  constructor(
    @inject('datastores.diary') public diaryStore: DiaryDataStore,
    @inject(RestBindings.Http.RESPONSE) public res: ServerResponse
  ) {}
}
```

11. Now we can delete the `helloWorld` method and write some new methods for our Diaries as follows:

```ts
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
```

## Running you application
1. If you have the previous version running, press `Ctrl + C` in the `terminal` to stop the app. Now we can restart our application by running the following command in `terminal`:

```sh
npm start
```

2. The server will start with a default port of `3000`. If you visit `localhost:3000` from your browser, you should see `[ ]` because we don't have any diary entries.

3. Visit `localhost:3000/swagger-ui` to be able to see a Swagger Docs interface that will let you try out any of the requests.

## Next Steps
__Congrats! You've completed Step 4 - Basic Diary Application.__ Move on to step 5 by [clicking here](https://github.com/virkt25/cascon-2017/tree/step-05).
