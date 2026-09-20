import { createI18n } from "vue-i18n";
import ja from "./locales/ja.json";
import zh from "./locales/zh.json";
import en from "./locales/en.json";

const saved = localStorage.getItem("birthday-lang") || "ja";

const i18n = createI18n({
  legacy: false,
  locale: saved,
  fallbackLocale: "ja",
  messages: { ja, zh, en },
});

export default i18n;
