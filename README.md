# Trivia (React Challenge)

Small web app implementing the Trivia game, provided by [this API](https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean).

Sample returned JSON:

```json
{
  "response_code": 0,
  "results": [
    {
      "category": "Entertainment: Video Games",
      "type": "boolean",
      "difficulty": "hard",
      "question": "Unturned originally started as a Roblox game.",
      "correct_answer": "True",
      "incorrect_answers": [
        "False"
      ]
    }, 
    "...etc"
  ]
}
```

## Live demo

See it deployed at https://trivia-react-challenge.vercel.app

## Design decisions

* "Kind of" Clean Architecture

I focused first and foremost on the concept of **decoupling**. Being a frontend app, the main focus of it lies on decoupling logic from UI. Up to some point - and if used properly -, React is great for this end.

So I tried to keep most of the UI components as dumb as possible, getting their data from hooks and painting the screens.

But, the `domain` and `application` layers are not 100% decoupled from the framework API, specifically React's Context and native hooks like `useReducer`. 

The most nuclear and important logic of the app can be found inside **`src/domain/quiz.tsx`** file. It's modeled as a React custom hook called `useQuiz`. It uses a pure reducer from a file sitting next to it: `quizReducer.tsx`. You can see this hook as the interface to the store/state of the core entity: `Quiz`('s state).

So this resulted in a very unorthodox and minimalistic implementation of the famous  [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html). 

There are no `ports` nor `adapters`, only a slight decoupling in components like **`src/components/Quiz`** and **`src/components/Results`**, where a wrapper/enhancer/decorator component handles the logic and pass the relevant props to the bare-view component.

Given the size and scope of this app (and after all, it's a coding challenge and not an enterprise-grade commercial app!), I choose to "cut corners", keep some "dependency" with the framework's API and not adding extra code that would make it the purest and cleanest (i.e. extra layers).

* Question type: boolean / multiple choice. 

OpenTDB provides both type of questions and the API response has the same structure for either. So I implemented `Question` component in a way that could equally handle both kinds of questions. 

To try this out, just add some `ApiParams` (see `src/domain/questionsService`) in the useEffect code where **`components/Quiz/Quiz`** calls `getQuestions()`. You can change the number of questions, the difficulty and the type. It will work just fine! 🎉🎉 - this is done this way to show the decoupling between the data/domain "layer" from the UI.

As the scope of the challenge was deliberately narrowed to only True/False questions, I ommited the needed code to parametrize such option from the UI. But it would be extremely easy to add handling the state for those params inside `src/application/appContext`.

All possible answers (the correct one + all the incorrects) are presented in shuffled order. This is why, for some questions you'll see True on the left and False on the right, and for some others you'll see them in reversed position. This looked sighly weird on the first sight but, after all, it's a Trivia game: you have to pay attention! 🙃


* Screen/View handling

The app has fundamentally 3 screens: `Home`, `Quiz` and `Results`. As "children" of `Quiz` we have `Question` (and `ErrorMessage`).

Initially, I thought about using React-Router to handle. That would provide a route-based navigation like `/home`,  `/quiz/1..N` for each question and `/results`

But since each Quiz run should request the API again to have different questions (*I assumed this, since: what's the point of answering again the questions you have just seen the result?*), there is no reason to have identified URLs. So, a different approach seemed better:

Instead, the `Screen` is handled by an internal state in the `AppContext` "layer", which is read and handled by any of the given screens through the methods `onBegin`, `onEnd` and `onReset`.

* Fetching the data from a `useEffect` hook inside `Quiz`

This is a de-facto convention which I never got to like entirely. [See this keynote](https://www.youtube.com/watch?v=95B8mnhzoCM) for a more in-depth analysis about it. I could have used NextJS's `getStaticProps()`, Remix's `loader()` (or the upcoming ReactRouter `loader={fn}` prop) but for simplicity's sake, and showing-off my vainilla-React skills I decided not to use any of those libraries.

So, this is an approach I'm not totally happy with, but was good enough for the task.


## Other considerations

* Using Vite instead of CRA (or any other)

Vite is a new tool built by the VueJS team but getting increasingly popular, and there's plenty of templates featuring what I wanted, namely: `React v18`, `TypeScript`, and `ESLint`+`Prettier`. See below for more on this.

* Double-rendering

Keep in mind that, in dev env, [when using `React.StrictMode`, since React v18](https://reactjs.org/blog/2022/03/29/react-v18.html#new-strict-mode-behaviors), each components gets mounted twice. 

~~I could have implemented [this workaround](https://blog.ag-grid.com/avoiding-react-18-double-mount/) but it adds extra code and this "bug" is actually harmless.~~

Edit: I **did** implement that approach, see `src/application/utils.tsx`.

The double-mount would have been harmless in production. But in dev, given the API fetch was being done twice, the user would see the first question of the first response for a very short time and immediately it would be replaced by the first question of the **second** response. This was annoying and fixed with the `useEffectOnce` hook.

* Fetch libraries

I'm very fond of using `useSWR` and/or `axios`. But since there's only one fetch per-run in this app, using bare native `fetch` seemed enough.

* Extra feature: include user answers in Results view

This wasn't included in the 


## Usage

```bash
git clone THIS_REPO_URL

cd trivia-react-challenge

yarn install

yarn dev
```

## Available commands

<p>In this project, you can run the following scripts:</p>

| Script        | Description                                                                 |
| ------------- | --------------------------------------------------------------------------- |
| yarn dev      | Runs the app in the development mode.                                       |
| yarn build    | Builds the app for production to the `dist` folder.                         |
| yarn preview  | Builds the app for production to the `dist` folder, and run locally server. |
| yarn lint     | Runs the Eslint and show code problems                                      |
| yarn lint:fix | Runs the Eslint and fix the code problems                                   |
| yarn format   | Runs the Prettier and fix code style                                        |
| yarn compile  | Runs the TS Compiling                                                       |
| yarn test     | Run the app tests.                                                          |
| yarn commit   | Open the CZ CLI to create a message to your commit.                         |


## Tools used

Generated with [ViteJS](https://vitejs.dev/), using [this ❤️‍🔥 template](https://github.com/potreco/viterc), which features: React 18, TypeScript, ESLint + Prettier (Airbnb's Javascript Guidelines), Husky, Jest, React-Testing-Library and a few more yummy ingredients...

## License

[MIT](https://choosealicense.com/licenses/mit/)
