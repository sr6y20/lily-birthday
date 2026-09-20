<template>
  <div ref="container" class="stars-layer"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const container = ref(null);

onMounted(() => {
  const isMobile = window.innerWidth <= 600;
  const starCount = isMobile ? 60 : 120;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%);
      border-radius:50%;
      top:${Math.random() * 100}%;
      left:${Math.random() * 100}%;
      opacity:${Math.random() * 0.6 + 0.2};
      animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite ${Math.random() * 3}s;
    `;
    container.value.appendChild(star);
  }
});
</script>

<style scoped>
.stars-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}
</style>

<style>
@keyframes twinkle {
  0%,
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}
</style>
