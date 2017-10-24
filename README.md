# cascon-2017
CASCON 2017 Workshop Tutorial

## Overview
This is a tutorial for LoopBack 4 that will show you how to get started creating LoopBack 4 Applications. This will be presented at CASCON 2017. The application we'll be creating is a simple Diary application to write your daily thoughts but we'll get a tone analysis from [Watson Tone Analyzer](https://www.ibm.com/watson/services/tone-analyzer/) for each diary entry to understand your mood and to be able to search for entries by mood.

## Tutorial - Step 05 - Making it Cognitive
1. We have some basic APIs but there's nothing cognitive about it. We'll add in the last piece now which is Watson Tone Analyzer. We'll need to install a few new packages by running the following command in `terminal`:

```sh
npm i watson-developer-cloud bluebird @types/watson-developer-cloud @types/bluebird
```

2. Next we'll need to create a type for our `Tone` in `/src/types.ts` as follows:

```ts
export type Tone = {
  score: number;
  tone_id: string;
  tone_name: string;
};
```

3. Now for each `Diary` entry we'll store an array of `Tone`s that we get back from the __ToneAnalyzer__ by adding the following property to the type definition for `Diary`:

```ts
tones: Tone[];
```

4. Now to use __ToneAnalyzer__ we'll need credentials. You can do so by signing up for the free instance on [Bluemix](https://www.bluemix.net). __NOTE:__ CASCON attendees will find a file on their desktop called `creds.ts`. You should copy & paste this into your project directory. You can now move on to step 5.

 - *For those following along at home, create a file in the project directory called `creds.ts` with the following contents. Update credentials to your own.*

```ts
export const creds = {
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
  username: '<YOUR USERNAME>',
  password: '<YOUR PASSWORD>',
  version: '<LATEST WATSON VERSION DATE (ex: 2017-09-21)>'
};
```

5. Now we will bind our credentials so they can be injected into our controller. We'll start by importing `creds` in `app.ts` as follows:

```ts
// Add at top of app.ts
import {creds} from '../creds';
```

6. Now we'll bind the credentials by adding the following 3 lines below our other bindings in `app.ts`. 

```ts
this.bind('tone_analyzer.username').to(creds.username);
this.bind('tone_analyzer.password').to(creds.password);
this.bind('tone_analyzer.version').to(creds.version);
```

7. Now the last file we need to update is going to be our controller. Let's start by importing `ToneAnalyzerV3` and `Promise` by adding the following lines at the top of our file:

```ts
import {Promise} from 'bluebird';
import {ToneAnalyzerV3} from 'watson-developer-cloud';
```

8. Next we'll declare a `tone_analyzer` property on our class of type `any`. 

```ts
export class DiaryController {
  // Add property line here
  tone_analyzer: any;
}
```

9. Now in our constructor, we'll inject our credentials and initialize an instance of `ToneAnalyzerV3` as well as promisify the `tone` function. The constructor should look as follows:

```ts
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
```

10. Now we analyze all posts before saving them by updating our `createDiary` method as follows:

```ts
@post("/")
@param.body("diary", diarySchema)
async createDiary(diary: any) {
  const tone = await this.tone_analyzer.tone({ text: diary.body });
  diary.tones = tone.document_tone.tones;

  return this.diaryStore.createDiary(diary);
}
```

11. The final change we'll make is to let users filter by providing an optional query parameter called `tone` for our `getDiaries` method. If present, we'll filter all diary entries and only return ones which have the requested tone. Here's what this will look like:

```ts
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
```

## Running you application
1. If you have the previous version running, press `Ctrl + C` in the `terminal` to stop the app. Now we can restart our application by running the following command in `terminal`:

```sh
npm start
```

2. The server will start with a default port of `3000`. If you visit `localhost:3000` from your browser, you should see `[ ]` because we don't have any diary entries.

3. Visit `localhost:3000/swagger-ui` to be able to see a Swagger Docs interface that will let you try out any of the requests.

## Next Steps
__Congrats! You've completed Step 5 - Making it Cognitive.__ You're done! 
