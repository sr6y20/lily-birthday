<template>
  <div class="floating-wish" :class="{ open: showInput }">
    <button
      class="wish-trigger"
      @click="showInput = !showInput"
      :title="t('wish.placeholder')">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"
          stroke="#f0c27f"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </button>
    <transition name="wish-fade">
      <div v-if="showInput" class="wish-panel">
        <input
          ref="wishInput"
          v-model="wishText"
          :placeholder="t('wish.placeholder')"
          maxlength="50"
          @keyup.enter="sendWish"
          class="wish-input" />
        <button class="wish-send" @click="sendWish">
          {{ t("wish.send") }}
        </button>
      </div>
    </transition>
    <!-- floating wishes -->
    <div
      v-for="(w, i) in floatingWishes"
      :key="w.id"
      class="floating-msg"
      :style="w.style">
      {{ w.text }}
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const showInput = ref(false);
const wishText = ref("");
const wishInput = ref(null);
const floatingWishes = ref([]);
let idCounter = 0;
let timers = [];

function sendWish() {
  const text = wishText.value.trim();
  if (!text) return;
  const id = ++idCounter;
  const style = {
    left: Math.random() * 60 + 20 + "%",
    top: Math.random() * 40 + 30 + "%",
    animationDuration: Math.random() * 3 + 8 + "s",
    animationDelay: Math.random() * 2 + "s",
    fontSize: Math.random() * 0.4 + 0.8 + "rem",
  };
  floatingWishes.value.push({ id, text, style });
  wishText.value = "";
  // remove after animation
  const timer = setTimeout(() => {
    floatingWishes.value = floatingWishes.value.filter(w => w.id !== id);
  }, 12000);
  timers.push(timer);
}

onUnmounted(() => {
  timers.forEach(clearTimeout);
});
</script>

<style scoped>
.floating-wish {
  position: fixed;
  bottom: 100px;
  right: 30px;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.wish-trigger {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(240, 194, 127, 0.3);
  background: rgba(10, 10, 26, 0.8);
  backdrop-filter: blur(10px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.wish-trigger:hover {
  border-color: #f0c27f;
  box-shadow: 0 0 16px rgba(240, 194, 127, 0.2);
}
.wish-trigger svg {
  width: 20px;
  height: 20px;
}
.wish-panel {
  display: flex;
  gap: 6px;
  background: rgba(10, 10, 26, 0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(240, 194, 127, 0.2);
  border-radius: 24px;
  padding: 6px 8px;
}
.wish-input {
  width: 160px;
  padding: 8px 14px;
  border: none;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  color: #ffe4c9;
  font-family: "Zen Maru Gothic", serif;
  font-size: 0.85rem;
  outline: none;
}
.wish-input::placeholder {
  color: rgba(255, 228, 201, 0.3);
}
.wish-send {
  padding: 8px 16px;
  border: none;
  border-radius: 18px;
  background: rgba(240, 194, 127, 0.15);
  color: #f0c27f;
  font-family: "Zen Maru Gothic", serif;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.3s;
}
.wish-send:hover {
  background: rgba(240, 194, 127, 0.3);
}
.wish-fade-enter-active,
.wish-fade-leave-active {
  transition: all 0.3s ease;
}
.wish-fade-enter-from,
.wish-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

<style>
.floating-msg {
  position: fixed;
  color: rgba(240, 194, 127, 0.7);
  font-family: "Zen Maru Gothic", serif;
  pointer-events: none;
  z-index: 12;
  animation: wishFloat linear forwards;
  text-shadow: 0 0 10px rgba(240, 194, 127, 0.3);
}
@keyframes wishFloat {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  15% {
    opacity: 0.9;
    transform: translateY(0) scale(1);
  }
  85% {
    opacity: 0.6;
  }
  100% {
    opacity: 0;
    transform: translateY(-80px) scale(0.9);
  }
}
</style>
