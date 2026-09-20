<template>
  <div class="crane" :style="craneStyle">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="craneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color: #fff; stop-opacity: 0.9" />
          <stop offset="100%" style="stop-color: #f0c27f; stop-opacity: 0.7" />
        </linearGradient>
      </defs>
      <!-- Body -->
      <path
        d="M 50 30 L 70 50 L 50 70 L 30 50 Z"
        fill="url(#craneGrad)"
        opacity="0.8" />
      <!-- Left wing -->
      <path
        d="M 50 50 L 20 35 L 30 50 Z"
        fill="url(#craneGrad)"
        opacity="0.7" />
      <!-- Right wing -->
      <path
        d="M 50 50 L 80 35 L 70 50 Z"
        fill="url(#craneGrad)"
        opacity="0.7" />
      <!-- Neck -->
      <path
        d="M 50 30 L 45 20 L 50 25 Z"
        fill="url(#craneGrad)"
        opacity="0.9" />
      <!-- Tail -->
      <path
        d="M 50 70 L 55 80 L 50 75 Z"
        fill="url(#craneGrad)"
        opacity="0.9" />
    </svg>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  delay: { type: Number, default: 0 },
  duration: { type: Number, default: 15 },
  startX: { type: Number, default: 0 },
  startY: { type: Number, default: 0 },
});

const craneStyle = computed(() => ({
  left: `${props.startX}vw`,
  top: `${props.startY}vh`,
  animationDuration: `${props.duration}s`,
  animationDelay: `${props.delay}s`,
}));
</script>

<style scoped>
.crane {
  position: fixed;
  width: 40px;
  height: 40px;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  animation: craneFly linear infinite;
}

@keyframes craneFly {
  0% {
    opacity: 0;
    transform: translate(0, 0) rotate(0deg) scale(0.8);
  }
  10% {
    opacity: 0.7;
  }
  50% {
    transform: translate(30vw, 20vh) rotate(10deg) scale(1);
  }
  90% {
    opacity: 0.5;
  }
  100% {
    opacity: 0;
    transform: translate(60vw, 50vh) rotate(-5deg) scale(0.6);
  }
}

@media (max-width: 768px) {
  .crane {
    width: 30px;
    height: 30px;
  }
}

@media (max-width: 600px) {
  .crane {
    width: 25px;
    height: 25px;
  }
}
</style>
