<template>
  <section class="memory-section">
    <h2 class="memory-title reveal">{{ t("memory.title") }}</h2>
    <div class="memory-grid">
      <!-- Placeholder: images will be added later -->
      <div class="memory-card reveal" v-for="i in placeholderCount" :key="i">
        <div class="memory-placeholder">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const placeholderCount = computed(() => (window.innerWidth <= 600 ? 2 : 4));
</script>

<style scoped>
.memory-section {
  padding: 80px 20px;
}
.memory-title {
  font-family: "Noto Serif JP", serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 500;
  color: var(--gold);
  margin-bottom: 50px;
  letter-spacing: 0.15em;
  text-align: center;
}
.memory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}
.memory-card {
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(240, 194, 127, 0.1);
  background: rgba(255, 255, 255, 0.02);
}
.memory-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(240, 194, 127, 0.15);
}
.memory-placeholder svg {
  width: 48px;
  height: 48px;
}

@media (max-width: 600px) {
  .memory-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .memory-section {
    padding: 50px 16px;
  }
}
</style>
