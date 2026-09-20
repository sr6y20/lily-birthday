<template>
  <div class="lantern" :style="lanternStyle">
    <svg viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="lanternGlow">
          <stop offset="0%" style="stop-color: #ffeb3b; stop-opacity: 0.8" />
          <stop offset="100%" style="stop-color: #ff9800; stop-opacity: 0.3" />
        </radialGradient>
        <linearGradient id="lanternBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: #d32f2f; stop-opacity: 0.9" />
          <stop offset="50%" style="stop-color: #c62828; stop-opacity: 0.95" />
          <stop offset="100%" style="stop-color: #b71c1c; stop-opacity: 0.9" />
        </linearGradient>
      </defs>
      <!-- Top cap -->
      <rect x="20" y="10" width="20" height="6" rx="1" fill="#333" />
      <!-- String -->
      <line x1="30" y1="0" x2="30" y2="10" stroke="#666" stroke-width="1" />
      <!-- Body -->
      <ellipse cx="30" cy="45" rx="22" ry="30" fill="url(#lanternBody)" />
      <!-- Glow -->
      <ellipse
        cx="30"
        cy="45"
        rx="18"
        ry="26"
        fill="url(#lanternGlow)"
        opacity="0.6" />
      <!-- Ribs -->
      <line
        x1="30"
        y1="15"
        x2="30"
        y2="75"
        stroke="#8b1425"
        stroke-width="0.5"
        opacity="0.5" />
      <ellipse
        cx="30"
        cy="45"
        rx="22"
        ry="30"
        fill="none"
        stroke="#8b1425"
        stroke-width="0.5"
        opacity="0.3" />
      <!-- Bottom cap -->
      <rect x="22" y="73" width="16" height="5" rx="1" fill="#333" />
      <!-- Tassel -->
      <line x1="30" y1="78" x2="30" y2="90" stroke="#d32f2f" stroke-width="2" />
      <circle cx="30" cy="92" r="2" fill="#d32f2f" />
    </svg>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  x: { type: Number, default: 50 },
  y: { type: Number, default: 20 },
  size: { type: Number, default: 50 },
  delay: { type: Number, default: 0 },
});

const lanternStyle = computed(() => ({
  left: `${props.x}%`,
  top: `${props.y}%`,
  width: `${props.size}px`,
  animationDelay: `${props.delay}s`,
}));
</script>

<style scoped>
.lantern {
  position: fixed;
  z-index: 2;
  pointer-events: none;
  opacity: 0.6;
  animation: lanternSway 4s ease-in-out infinite;
  filter: drop-shadow(0 0 20px rgba(255, 152, 0, 0.4));
}

@keyframes lanternSway {
  0%,
  100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

@media (max-width: 768px) {
  .lantern {
    opacity: 0.4;
  }
}

@media (max-width: 600px) {
  .lantern {
    width: 35px !important;
    opacity: 0.3;
  }
}
</style>
