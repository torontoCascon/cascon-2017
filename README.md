# cascon-2017
CASCON 2017 Workshop Tutorial

## Overview
This is a tutorial for LoopBack 4 that will show you how to get started creating LoopBack 4 Applications. This will be presented at CASCON 2017. The application we'll be creating is a simple Diary application to write your daily thoughts but we'll get a tone analysis from [Watson Tone Analyzer](https://www.ibm.com/watson/services/tone-analyzer/) for each diary entry to understand your mood and to be able to search for entries by mood.

## Tutorial - Step 02 - Hello World
1. Now we're ready to start writing some code. Let's start with a simple Hello LoopBack application. We'll start by creating a file called `index.ts` in our project directory.

2. Open the file in your favorite text editor. We'll start by importing in our dependencies as follows:

```ts
// Application is a top-level container for our app
import {Application} from '@loopback/core';
// RestComponent - provides us with a RestServer (HTTP Protocol) 
// get - HTTP GET Request Decorator
import {RestComponent, get} from '@loopback/rest'
```

3. Now we'll define a controller class that is responsible for receives a request and creates a response. A simple hello world controller looks as follows:

```ts
class DiaryController {
  @get("/")
  helloWorld() {
    return "Hello LoopBack";
  }
}
```

4. Next we'll create a new class that extends Application. Here we'll set our controller and the `RestComponent` as follows:

```ts
class DiaryApp extends Application {
  constructor() {
    super({
      components: [RestComponent]
    });

    this.controller(DiaryController); // Have DiaryApp use the DiaryController. An app can have multiple controllers
  }
}
```

5. Last but not least, we'll create an instance of our `DiaryApp` and start it as follows:

```ts
async function main() {
  const app = new DiaryApp();
  await app.start();
  console.log('App started');
}

main();
```

## Running you application
1. Now we can run our application to test it by going to `terminal` and running the following command:

```sh
npm start
```

2. The server will start with a default port of `3000`. If you visit `localhost:3000` from your browser, you should see `Hello LoopBack`.

## Next Steps
__Congrats! You've completed Step 2 - Hello World.__ Move on to step 3 by [clicking here](https://github.com/torontoCascon/cascon-2017/tree/step-03).
