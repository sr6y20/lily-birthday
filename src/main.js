import { createApp } from "vue";
import App from "./App.vue";
import i18n from "./i18n";
import "@fontsource/noto-serif-jp";
import "@fontsource/zen-maru-gothic";

createApp(App).use(i18n).mount("#app");
