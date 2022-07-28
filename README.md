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
