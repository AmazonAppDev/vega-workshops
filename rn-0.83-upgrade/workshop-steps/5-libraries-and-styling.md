# Explore the wider 0.83 ecosystem

In this step you will explore some of the wider changes that ship with RN 0.83 — new CSS-aligned style properties, and the kind of library uplevels that the New Architecture unlocks. We'll do this through two short exercises.

## Before you start

Make sure you've completed the workshop [Prerequisites](./0-prerequisites.md). You'll also want a working RN 0.83 build of the [Multi-TV Hello World](https://github.com/AmazonAppDev/react-native-multi-tv-helloworld) sample on the `release-rn-83` branch from [Step 2](./2-react-compiler.md).

## Step 1: Add a focus glow with `boxShadow`

`boxShadow` is a CSS-aligned style property that ships in RN 0.83. Pre-0.83, drop shadows on Android required platform tricks (`elevation`, native-only props, or third-party shadow components). On 0.83 it's a single string.

### 1a. Edit `Tile.tsx`'s focused style

In `packages/shared/src/components/Tile.tsx`, find the `focused` entry in the `StyleSheet.create({...})` block at the bottom. Add a `boxShadow`:

```tsx
focused: {
  backgroundColor: '#FF6200',
  transform: [{scale: 1.1}],
  opacity: 1,
  boxShadow: '0 0 24px 4px rgba(255, 98, 0, 0.6)',
},
```

### 1b. Build, run, traverse the tile row

Build and launch — see [Step 1: Build and run on a device](./1-rn-0.83-upgrade.md#step-5-build-and-run-on-a-device).

✅ **Checkpoint:** The focused tile now has an orange halo around it. Move focus across the row.

If you cherry-pick this change to `main` and rebuild, the `boxShadow` is silently ignored (Yoga 2 didn't recognise the property).

ℹ️ **More style additions to try.** RN 0.83 also adds `filter` (e.g. `blur(8px)`, `grayscale(1)`), `mixBlendMode`, and `outline`. Same pattern — a one-line CSS addition that produces a noticeable visual change. Try `filter: 'blur(2px)'` on unfocused tiles for a subtle "focused tile pops" effect.

## Step 2: Add FlashList 2.0 with your AI agent

[FlashList 2.0](https://shopify.engineering/flashlist-v2) is a ground-up rewrite from Shopify that **only runs on the New Architecture**, so it could not have worked on RN 0.72. The performance improvements that come with that:

- **~50% less blank area while scrolling** vs v1, per Shopify's benchmarks.
- **Pixel-perfect `scrollToIndex`.** v2 measures synchronously, so jumping to a specific item lands exactly there.
- **`maintainVisibleContentPosition` on by default.** Scroll position holds steady when content prepends or appends.
- **No more native modules.** v2 is pure JS, thanks to synchronous measurements in the New Architecture. Fewer platform-specific bugs to chase.
- **Better horizontal lists.** Items can be any size and resize after mount, which v1 couldn't do — relevant for TV carousels with varying-height tiles.

We'll add a new horizontal "Featured Apps" row below the existing tile row using FlashList, then profile it with the same RN DevTools Profiler from [Step 3](./3-react-native-devtools.md#step-5-use-the-profiler).

### 2a. Prompt your agent

🤖 **Prompt your agent.**

```
Add a horizontal "Featured Apps" row below the existing tile row in
packages/shared/src/screens/HomeScreen.tsx. Use FlashList from
@amazon-devices/shopify__flash-list at version 2.0.9000000000.
Generate 50 mock app cards with a placeholder icon, app name, and short
description — define them in packages/shared/src/data/featuredApps.ts.
Each card should be focusable and use the same focus styling pattern as
Tile.tsx (scale + boxShadow on focus).

Use the @amazon-devices/amazon-devices-buildertools-mcp knowledge base
for any Vega-specific guidance. Do not add estimatedItemSize — that's
the v1 API and is no longer needed in v2. Set horizontal={true} and
render the row at a fixed height below the existing tileRow.
```

### 2b. Build, run, profile

Build and launch — see [Step 1: Build and run on a device](./1-rn-0.83-upgrade.md#step-5-build-and-run-on-a-device).

You should see the new "Featured Apps" row below the original tile row. Focus into it and press right — the row scrolls horizontally as items go off-screen.

Now open RN DevTools and profile a focus traversal:

1. Switch to the **Profiler** tab in DevTools.
2. Click **Record**.
3. Press right 10–15 times to scroll the FlashList row.
4. Click **Stop** and inspect the **Flamegraph**.

✅ **Checkpoint:** Each commit (one focus change) renders only the cards entering/leaving focus plus a small recycling overhead — _not_ all 50 cards. Off-screen items don't appear in the flamegraph because FlashList is recycling their views.

## 🎆 Congratulations, you're done — please hare your feedback

Nice work. You've upgraded a Vega app from React Native 0.72 to 0.83, switched on the React Compiler, profiled with the new RN DevTools, run it on Hermes v1, and adopted New-Architecture-only libraries.

The last thing we'd love from you: the prompt log you've been building since [Step 1's "Before you start"](./1-rn-0.83-upgrade.md#before-you-start). It's the most useful signal we have for tightening the upgrade experience.

🤖 **Prompt your agent.**

```
Wrap up my feedback
```

This appends the summary section (overall stats, friction hotspots, what worked well, recommendations, raw timeline) to `PROMPT_UPGRADE_PROCESS.md` in your project root.

📨 **Send the file to your Solutions Architect.** Once the summary is written, share `PROMPT_UPGRADE_PROCESS.md` with your SA. They'll route it back to the Vega RN 0.83 team so your friction points feed directly into the next iteration of the prompts, docs, and tooling.

## References

- [React Native 0.83 release notes](https://github.com/facebook/react-native/releases/tag/v0.83.0) — full upstream changelog from Meta.
- [Vega SDK 0.24 release notes](https://developer.amazon.com/docs/vega/0.24/vega-release-notes) — Vega-specific notes, including supported RN APIs.
- [Known issues for RN 0.83](https://developer.amazon.com/docs/vega/0.24/vega-release-notes#known-issues) — library and Expo caveats on Vega 0.83.

---

**Previous:** [See Hermes v1 in action](./4-hermes-v1.md)
