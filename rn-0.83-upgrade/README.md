# Upgrade to React Native 0.83 on Vega

A hands-on workshop for upgrading a React Native app to React Native 0.83 on Vega (supported from Vega SDK 0.24), using the Amazon Devices Builder Tools MCP and an AI coding assistant.

By the end you'll have:

- Run the AI-assisted upgrade helper on a real app
- Enabled the React Compiler on a Vega build
- Used React Native DevTools to check the compiler did its job
- Benchmarked the performance improvements in Hermes v1

## Workshop steps

0. [Prerequisites](./workshop-steps/0-prerequisites.md): Vega SDK 0.24 and the MCP server setup
1. [Upgrade to React Native 0.83](./workshop-steps/1-rn-0.83-upgrade.md): the AI-assisted upgrade helper
2. [See the React Compiler in action](./workshop-steps/2-react-compiler.md): RN 0.72 / React 18 compared with RN 0.83 / React 19
3. [Use React Native DevTools](./workshop-steps/3-react-native-devtools.md): confirm the compiler memoised your components
4. [See Hermes v1 in action](./workshop-steps/4-hermes-v1.md): JavaScript runtime benchmarks, 0.72 compared with 0.83
5. [Explore the wider 0.83 ecosystem](./workshop-steps/5-libraries-and-styling.md) (optional): libraries and styling

## What's in this folder

```
workshop-steps/
  0-prerequisites.md ... 5-libraries-and-styling.md   The workshop, one file per step
  images/                                             Screenshots and GIFs used in the steps
  references/compiler/                                Reference code for Step 2 (Babel transformer, render badge)
  references/hermes/                                  Reference code for Step 4 (benchmark, API demo, Hermes info)
```

The steps build against the [Multi-TV Hello World](https://github.com/AmazonAppDev/react-native-multi-tv-helloworld) sample. Its `main` branch is on RN 0.72 and its `release-rn-83` branch is on RN 0.83, so you can compare the two versions side by side.

## What you'll need

- macOS (Apple Silicon) or Ubuntu
- Vega SDK 0.24 or later
- An AI coding assistant that supports MCP
- Optionally, a Fire TV device running Vega (the Vega Virtual Device also works)

[Step 0](./workshop-steps/0-prerequisites.md) has the full setup walkthrough.

## Feedback

Issues and suggestions are welcome. [Open an issue](https://github.com/AmazonAppDev/vega-workshops/issues) on this repo, or send them through the Amazon Devices Builder Tools MCP feedback flow.
