<template>
  <div class="lang-switcher">
    <button
      v-for="code in langs"
      :key="code"
      :class="{ active: locale === code }"
      @click="switchLang(code)">
      {{ t(`lang.${code}`) }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();
const langs = ["ja", "zh", "en"];

function switchLang(code) {
  locale.value = code;
  localStorage.setItem("birthday-lang", code);
}
</script>

<style scoped>
.lang-switcher {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 20;
  display: flex;
  gap: 4px;
  background: rgba(10, 10, 26, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(240, 194, 127, 0.15);
  border-radius: 20px;
  padding: 4px;
}

.lang-switcher button {
  padding: 6px 14px;
  border: none;
  border-radius: 16px;
  background: transparent;
  color: rgba(255, 228, 201, 0.5);
  font-family: "Zen Maru Gothic", serif;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
  letter-spacing: 0.05em;
}

.lang-switcher button:hover {
  color: rgba(255, 228, 201, 0.8);
}

.lang-switcher button.active {
  background: rgba(240, 194, 127, 0.15);
  color: #f0c27f;
}
</style>
