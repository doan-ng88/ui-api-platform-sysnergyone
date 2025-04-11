import "pinia";

declare module "pinia" {
	export interface PiniaCustomProperties {
		// type the router added by the plugin above (#adding-new-external-properties)
		router: import("vue-router").Router;
	}
}
