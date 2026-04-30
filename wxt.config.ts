import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
	entrypointsDir: "app",
	manifest: {
		name: "MuteTab",
		description: "Mute or unmute the active browser tab with one click.",
		action: {
			default_icon: {
				16: "/sound-on.png",
				24: "/sound-on.png",
				32: "/sound-on.png",
			},
			default_title: "Mute this tab",
		},
		icons: {
			16: "/sound-on.png",
			24: "/sound-on.png",
			32: "/sound-on.png",
			48: "/sound-on.png",
			96: "/sound-on.png",
			128: "/sound-on.png",
		},
		// v1 only needs access to the active tab so we can read and update its mute state.
		permissions: ["tabs"],
	},
});
