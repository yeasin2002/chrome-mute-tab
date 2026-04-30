import { browser } from "wxt/browser";

const ACTION_ICONS = {
  muted: "sound-mute.png",
  unmuted: "sound-on.png",
} as const;

async function setTabActionState(tabId: number, muted: boolean) {
  await browser.action.setIcon({
    tabId,
    path: muted ? ACTION_ICONS.muted : ACTION_ICONS.unmuted,
  });

  await browser.action.setTitle({
    tabId,
    title: muted ? "Unmute this tab" : "Mute this tab",
  });
}

async function syncTabActionState(tabId: number) {
  try {
    const tab = await browser.tabs.get(tabId);
    await setTabActionState(tabId, tab.mutedInfo?.muted ?? false);
  } catch {
    // Ignore tabs that disappear while the service worker is syncing state.
  }
}

async function syncActiveTabActionState(windowId?: number) {
  try {
    const [tab] = await browser.tabs.query({
      active: true,
      windowId,
      currentWindow: windowId == null,
    });

    if (tab?.id == null) {
      return;
    }

    await syncTabActionState(tab.id);
  } catch {
    // Ignore cases where there is no focused browser window yet.
  }
}

export default defineBackground(() => {
  void syncActiveTabActionState();

  browser.runtime.onInstalled.addListener(() => {
    void syncActiveTabActionState();
  });

  browser.runtime.onStartup.addListener(() => {
    void syncActiveTabActionState();
  });

  browser.action.onClicked.addListener((tab) => {
    const tabId = tab.id;

    if (tabId == null) {
      return;
    }

    void (async () => {
      const nextMuted = !(tab.mutedInfo?.muted ?? false);

      await browser.tabs.update(tabId, { muted: nextMuted });
      await setTabActionState(tabId, nextMuted);
    })();
  });

  browser.tabs.onActivated.addListener(({ tabId }) => {
    void syncTabActionState(tabId);
  });

  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (typeof changeInfo.mutedInfo?.muted === "boolean") {
      void setTabActionState(tabId, changeInfo.mutedInfo.muted);
      return;
    }

    if (tab.active && changeInfo.status === "complete") {
      void syncTabActionState(tabId);
    }
  });

  browser.windows.onFocusChanged.addListener((windowId) => {
    if (windowId === browser.windows.WINDOW_ID_NONE) {
      return;
    }

    void syncActiveTabActionState(windowId);
  });
});
