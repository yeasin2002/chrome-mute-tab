import { browser } from "wxt/browser";

import { syncTabActionState, toggleTabMuteState } from "../helpers";

export default defineBackground(() => {
	void syncTabActionState();

	browser.runtime.onInstalled.addListener(() => {
		void syncTabActionState();
	});

	browser.runtime.onStartup.addListener(() => {
		void syncTabActionState();
	});

	browser.action.onClicked.addListener((tab) => {
		const tabId = tab.id;

		if (tabId == null) {
			return;
		}

		void toggleTabMuteState(tabId, !(tab.mutedInfo?.muted ?? false));
	});

	browser.tabs.onActivated.addListener(({ tabId }) => {
		void syncTabActionState({ tabId });
	});

	browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
		if (typeof changeInfo.mutedInfo?.muted === "boolean") {
			void syncTabActionState({ tabId });
			return;
		}

		if (tab.active && changeInfo.status === "complete") {
			void syncTabActionState({ tabId });
		}
	});

	browser.windows.onFocusChanged.addListener((windowId) => {
		if (windowId === browser.windows.WINDOW_ID_NONE) {
			return;
		}

		void syncTabActionState({ windowId });
	});
});
