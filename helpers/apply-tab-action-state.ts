import { browser } from "wxt/browser";

import { ACTION_ICONS, TAB_ACTION_TITLES } from "./tab-action-state.constants";

export async function applyTabActionState(tabId: number, muted: boolean) {
	const iconKey = muted ? "muted" : "unmuted";

	await browser.action.setIcon({
		tabId,
		path: ACTION_ICONS[iconKey],
	});

	await browser.action.setTitle({
		tabId,
		title: TAB_ACTION_TITLES[iconKey],
	});
}
