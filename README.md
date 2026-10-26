# Vega Workshops

Hands-on workshops for building and upgrading React Native apps on [Vega](https://developer.amazon.com/docs/vega/vega.html), the OS behind Amazon Fire TV. Each workshop sits in its own folder with its own README, setup steps, and reference code. Pick one and follow it from Step 0.

## Built for AI-assisted development

You can work through every workshop by hand, or pair with an AI coding assistant (Kiro, Claude Code, Cursor, Copilot, and others):

- **Agent prompts.** Look for 🤖 **Prompt your agent** in the steps. Copy the prompt into your assistant to have it do the step or explain it.
- **Amazon Devices Builder Tools MCP.** It connects your assistant to Vega docs, the React Native upgrade workflow, and performance tooling. Step 0 of each workshop sets it up.
- **Teaching-mode agent instructions.** Workshops with an `AGENTS.md` tell your assistant to go one step at a time and pause to explain, rather than racing to the finish.
- **Starter prompts.** Some workshops end with a ready-made prompt for extending the app, such as building a streaming TV experience.

## Workshops

| Workshop | What you'll learn |
|---|---|
| [Upgrade to React Native 0.83](./rn-0.83-upgrade/) | Upgrade a Vega app from RN 0.72 to 0.83 with the Amazon Devices Builder Tools MCP and an AI coding assistant. Then see the React Compiler, React Native DevTools, and Hermes v1 in action. |
| [Multi-TV Hello World](./rn-multi-tv/) | Build a React Native TV app that runs on Fire TV (Vega), Android TV, Apple TV, and the web from one shared codebase, then compare `FlatList` with the Vega Carousel on a real device. |

## How to use these workshops

### 1. Fork and clone

Fork this repo so you can commit your progress as you go. When GitHub asks, **untick "Copy the `main` branch only"** so the completed-app branches come with your fork.

```bash
git clone https://github.com/<your-username>/vega-workshops.git
cd vega-workshops
```

### 2. Pick a workshop for your use case

The workshops are independent, so do one, some, or all of them:

| If you... | Start with |
|---|---|
| Are new to Vega, or want one React Native codebase for Fire TV, Android TV, Apple TV, and web | [Multi-TV Hello World](./rn-multi-tv/) |
| Already have a Vega app on React Native 0.72 and want to move to 0.83 | [Upgrade to React Native 0.83](./rn-0.83-upgrade/) |
| Want to see what React 19, the React Compiler, and Hermes v1 bring to Vega | [Upgrade to React Native 0.83](./rn-0.83-upgrade/), Steps 2 to 4 |
| Want to do them all | Multi-TV Hello World first to learn the Vega basics, then Upgrade to React Native 0.83 |

### 3. Follow the steps

Open the workshop's README and start at Step 0, which covers its exact prerequisites. Run every command from inside that workshop's folder (for example, `cd rn-multi-tv`). The Upgrade to React Native 0.83 workshop runs against your own Vega app or a separate sample app. Its Step 1 covers both options.

## Branches

`main` holds the starting point for every workshop. Where a workshop has completed versions to compare against, they sit on branches prefixed with the workshop's folder name:

| Branch | Contents |
|---|---|
| [`rn-multi-tv/final-app`](https://github.com/AmazonAppDev/vega-workshops/tree/rn-multi-tv/final-app) | Multi-TV Hello World with all workshop steps applied |
| [`rn-multi-tv/final-app-next-steps`](https://github.com/AmazonAppDev/vega-workshops/tree/rn-multi-tv/final-app-next-steps) | The final app plus the streaming TV experience from Next steps |

## Before you start

Most workshops need:

- macOS (Apple Silicon) or Ubuntu
- The [Vega SDK](https://developer.amazon.com/docs/vega/0.24/install-vega-sdk)
- An AI coding assistant connected to the Amazon Devices Builder Tools MCP

Each workshop's Step 0 lists the exact versions it needs.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.
