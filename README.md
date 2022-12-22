# BlinkRead

BlinkRead is a chrome extension that generates a quick summary of any website, powered by OpenAI [GPT-3](https://beta.openai.com/docs/models/gpt-3).

![Demo](https://i.imgur.com/Bwpghml.gifv)

## Quick Installation

You can find the extension on the [release page](https://github.com/akasuv/blinkread/releases).

## Getting Started

Dev mode

```
yarn && yarn dev
```

Production mode

```
yarn && yarn build
```

## Load Extension

After running `yarn dev` or `yarn build`, a folder called **extension** will be generated by Vite. Load it on the Chrome extension page.

## Server

You can find server-side code in this repo [blinkread-server](https://github.com/akasuv/blinkread-server).
