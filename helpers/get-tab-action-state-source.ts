import { browser } from "wxt/browser";

export async function getTabActionStateSource(
	tabId?: number,
	windowId?: number,
) {
	if (tabId != null) {
		return browser.tabs.get(tabId);
	}

	const [tab] = await browser.tabs.query({
		active: true,
		windowId,
		currentWindow: windowId == null,
	});

	return tab;
}
