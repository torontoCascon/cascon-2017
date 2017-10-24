# cascon-2017
CASCON 2017 Workshop Tutorial

## Overview
This is a tutorial for LoopBack 4 that will show you how to get started creating LoopBack 4 Applications. This will be presented at CASCON 2017. The application we'll be creating is a simple Diary application to write your daily thoughts but we'll get a tone analysis from [Watson Tone Analyzer](https://www.ibm.com/watson/services/tone-analyzer/) for each diary entry to understand your mood and to be able to search for entries by mood.

## Tutorial - Step 03 - Refactoring
1. Writing code in a single file gets messy fast. Before it gets to that point, we're going to refactor our application to follow some best practices. We'll start by creating a `src` directory in our project directory.

```sh
mkdir src
```

2. In `/src` we'll create another directory called `controllers`.

3. In `/src/controllers` we'll make a file called `diary.controller.ts`. Now we'll copy our controller class from `index.ts` into this file and import it's dependencies. __NOTE:__ We now export the class since it's in a different file. The file should look as follows:

```ts
import {get} from '@loopback/rest';

export class DiaryController {
  @get('/')
  helloWorld() {
    return 'Hello LoopBack';
  }
}
```

4. Now in `/src` directory we'll create a new file called `app.ts`. In it we'll copy our `DiaryApp` class, import it's dependencies and export the class. The file should look as follows:

```ts
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
```

5. Now last but not least, we'll update `index.ts` in the project directory. Here you can delete the `DiaryController` and `DiaryApp` class if you haven't already. Now we'll import these from their new files. We'll also write a new `main` function to start an instance of our `DiaryApp`. The contents of the file should look as follows:

```ts
import {DiaryApp} from './src/app';
import {RestServer} from '@loopback/rest';

(async function main() {
  const app = new DiaryApp();

  // Catch any startup errors
  await app.start().catch(err => {
    console.error('Cannot start the application! ', err);
    process.exit(1);
  });

  // Get an instance of the running default server
  const server = await app.getServer(RestServer);
  // Get the port the server is listening on
  const port = await server.get('rest.port');

  console.log(`Application started at localhost:${port}`);
})();
```

## Running you application
1. If you have the previous version running, press `Ctrl + C` in the `terminal` to stop the app. Now we can restart our application by running the following command in `terminal`:

```sh
npm start
```

2. The server will start with a default port of `3000`. If you visit `localhost:3000` from your browser, you should see `Hello LoopBack`.

## Next Steps
__Congrats! You've completed Step 3 - Refactoring.__ Move on to step 4 by [clicking here](https://github.com/virkt25/cascon-2017/tree/step-04).
