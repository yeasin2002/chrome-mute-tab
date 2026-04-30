# MuteTab

Mute or unmute the active browser tab with one click.

**GitHub:** https://github.com/yeasin2002/chrome-mute-tab

## Overview

MuteTab is a minimal browser extension built for one job: toggling the mute state of the currently active tab from the toolbar button.

The current project is a small `WXT` + `TypeScript` codebase with a background entrypoint and a few focused helpers. There is no popup, options page, or extra UI in v1.

## Current Scope

- Toggle the active tab between muted and unmuted from the extension icon
- Update the toolbar icon based on the current tab state
- Update the toolbar title between `Mute this tab` and `Unmute this tab`
- Re-sync action state on install, browser startup, tab activation, tab updates, and window focus changes
- Fail safely when tabs or windows disappear during async updates

## How It Works

`app/background.ts` owns the extension lifecycle.

- On click, it flips the mute state of the current tab
- On install and startup, it synchronizes the action icon/title
- On tab activation, tab updates, and window focus changes, it refreshes the current action state

The helper layer keeps each responsibility separate:

- `helpers/toggle-tab-mute-state.ts` updates the tab mute state
- `helpers/apply-tab-action-state.ts` sets the icon and action title
- `helpers/get-tab-action-state-source.ts` resolves the active tab to inspect
- `helpers/sync-tab-action-state.ts` keeps the toolbar state accurate
- `helpers/tab-action-state.constants.ts` stores icon and title mappings

## Tech Stack

- `WXT` for extension development and bundling
- `TypeScript`
- `Biome` for formatting and linting

## Permissions

The extension currently uses only one manifest permission:

- `tabs` to read and update the active tab mute state

## Project Structure

```text
app/
  background.ts
helpers/
  apply-tab-action-state.ts
  get-tab-action-state-source.ts
  index.ts
  sync-tab-action-state.ts
  tab-action-state.constants.ts
  toggle-tab-mute-state.ts
public/
  sound-mute.png
  sound-on.png
```

## Development

### Install

```bash
pnpm install
```

### Run in Development

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Package

```bash
pnpm zip
```

## Available Scripts

- `pnpm dev` starts WXT in development mode
- `pnpm dev:firefox` starts the Firefox dev build
- `pnpm build` creates a production build
- `pnpm build:firefox` creates a Firefox production build
- `pnpm zip` creates a distributable zip
- `pnpm zip:firefox` creates a Firefox distributable zip
- `pnpm compile` runs `tsc --noEmit`
- `pnpm fix` runs Biome with `--write`

## Current Version

- Package version: `0.1.0`
- Status: prototype / v1 baseline

## Roadmap Ideas

- Keyboard shortcut support
- Mute all tabs
- Site-specific auto-mute rules
- Badge or richer status indicators
- Session-level mute history
- Mute on tab open

## Notes

This repository is intentionally small. The current version focuses on reliable tab mute toggling and accurate toolbar state instead of adding popup UI or configuration screens early.
