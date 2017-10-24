# cascon-2017
CASCON 2017 Workshop Tutorial

## Overview
This is a tutorial for LoopBack 4 that will show you how to get started creating LoopBack 4 Applications. This will be presented at CASCON 2017. The application we'll be creating is a simple Diary application to write your daily thoughts but we'll get a tone analysis from [Watson Tone Analyzer](https://www.ibm.com/watson/services/tone-analyzer/) for each diary entry to understand your mood and to be able to search for entries by mood.

## Tutorial - Step 01 - Project setup
1. We're going to start by creating a new directory for our project. Let's call this `cascon-diary`. *This will be referred to as the __project directory__.* You can do so by running the following command:

```sh
mkdir cascon-diary
 ```

2. Now enter our directory and initialize `npm` in it by running the following commands. __NOTE:__ You will be prompted by a series of questions with a corresponding __default__ answer in `( )`. We will stick with the default answers for all questions except:
 - __main__: `dist/index.js`

```sh
cd cascon-diary
npm init
```

3. We will add a `start` script so we can easily compile and run our program. In `package.json`, under the `scripts` section, add the following line:

```json
"start": "tsc && node ."
```

4. Next we'll install our dependencies for the project (LoopBack 4). We'll also install the type definitions for node as a devDependency.

```sh
npm i @loopback/core @loopback/rest @loopback/context
npm i --save-dev @types/node
```

5. Since we’re using TypeScript we’ll also need to configure some options for it. In our project directory we’ll create a file called `tsconfig.json` and paste the following into it.

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "target": "es2017",
    "outDir": "dist",
    "sourceMap": true,
    "declaration": true
  }
}
```

__Congrats! You've completed Step 1 - Project Setup.__ Move on to step 2 by [clicking here](https://github.com/virkt25/cascon-2017/tree/step-02).
