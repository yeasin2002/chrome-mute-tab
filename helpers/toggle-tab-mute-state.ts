import { browser } from 'wxt/browser';

import { applyTabActionState } from './apply-tab-action-state';

export async function toggleTabMuteState(tabId: number, muted: boolean) {
  try {
    await browser.tabs.update(tabId, { muted });
    await applyTabActionState(tabId, muted);
  } catch {
    // Ignore tabs that close or reject updates between click and update.
  }
}
