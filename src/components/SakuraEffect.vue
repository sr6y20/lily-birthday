<template>
  <div></div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

let timer;

function createPetal() {
  const petal = document.createElement("div");
  petal.className = "sakura";
  const size = Math.random() * 14 + 10;
  const hue = Math.random() * 20 + 340;
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = Math.random() * 6 + 8 + "s";
  petal.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 20 20">
    <ellipse cx="10" cy="8" rx="6" ry="8" fill="hsl(${hue},80%,80%)" opacity="0.8"/>
  </svg>`;
  document.body.appendChild(petal);
  setTimeout(() => petal.remove(), 14000);
}

onMounted(() => {
  for (let i = 0; i < 6; i++) setTimeout(createPetal, i * 300);
  timer = setInterval(createPetal, 800);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style>
.sakura {
  position: fixed;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  animation: sakuraFall linear forwards;
}
.sakura svg {
  filter: drop-shadow(0 0 4px rgba(245, 166, 199, 0.4));
}

@keyframes sakuraFall {
  0% {
    opacity: 0;
    transform: translateY(-5vh) rotate(0deg) scale(0.8);
  }
  10% {
    opacity: 0.9;
  }
  90% {
    opacity: 0.7;
  }
  100% {
    opacity: 0;
    transform: translateY(105vh) rotate(720deg) scale(0.4);
  }
}
</style>
