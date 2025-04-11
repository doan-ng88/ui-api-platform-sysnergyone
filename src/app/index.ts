import { createPinia } from "pinia";
import { createApp, markRaw } from "vue";

import App from "./App.vue";
import { router } from "./providers/router";

const app = createApp(App);

const pinia = createPinia();

pinia.use(({ store }) => {
	store.router = markRaw(router);
});

app.use(pinia);

app.use(router);

export { app };
