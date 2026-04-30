import { applyTabActionState } from './apply-tab-action-state';
import { getTabActionStateSource } from './get-tab-action-state-source';

export async function syncTabActionState(options: {
  tabId?: number;
  windowId?: number;
} = {}) {
  try {
    const tab = await getTabActionStateSource(options.tabId, options.windowId);

    if (tab?.id == null) {
      return;
    }

    await applyTabActionState(tab.id, tab.mutedInfo?.muted ?? false);
  } catch {
    // Tabs and windows can disappear while we are syncing; ignore those cases.
  }
}
