<template>
  <canvas ref="fireworksCanvas" class="fw-canvas"></canvas>
  <canvas ref="clickCanvas" class="click-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const fireworksCanvas = ref(null);
const clickCanvas = ref(null);

const colors = [
  "#f0c27f",
  "#f5a6c7",
  "#ffe4c9",
  "#c090c8",
  "#ff9500",
  "#fff5e0",
];
let fwCtx, ckCtx, W, H;
let particles = [];
let sparks = [];
let animId1, animId2;
let autoTimer;

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.008;
    this.size = Math.random() * 2.5 + 0.5;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.02;
    this.vx *= 0.99;
    this.alpha -= this.decay;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Spark {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 4 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.size = Math.random() * 3 + 1;
    this.color = ["#f0c27f", "#f5a6c7", "#fff"][Math.floor(Math.random() * 3)];
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05;
    this.alpha -= 0.025;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(this.alpha, 0);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function burst(x, y) {
  const color = colors[Math.floor(Math.random() * colors.length)];
  const isMobile = window.innerWidth <= 600;
  const count = isMobile
    ? Math.floor(Math.random() * 20) + 15
    : Math.floor(Math.random() * 40) + 30;
  for (let i = 0; i < count; i++) particles.push(new Particle(x, y, color));
}

function autoFirework() {
  burst(Math.random() * W, Math.random() * H * 0.5 + 50);
  autoTimer = setTimeout(autoFirework, Math.random() * 3000 + 2000);
}

function onClick(e) {
  const isMobile = window.innerWidth <= 600;
  const sparkCount = isMobile ? 8 : 15;
  for (let i = 0; i < sparkCount; i++)
    sparks.push(new Spark(e.clientX, e.clientY));
  if (Math.random() > 0.5) burst(e.clientX, e.clientY);
}

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  if (fireworksCanvas.value) {
    fireworksCanvas.value.width = W;
    fireworksCanvas.value.height = H;
  }
  if (clickCanvas.value) {
    clickCanvas.value.width = W;
    clickCanvas.value.height = H;
  }
}

onMounted(() => {
  resize();
  fwCtx = fireworksCanvas.value.getContext("2d");
  ckCtx = clickCanvas.value.getContext("2d");
  window.addEventListener("resize", resize);
  document.addEventListener("click", onClick);

  function animateFireworks() {
    fwCtx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(fwCtx);
      if (particles[i].alpha <= 0) particles.splice(i, 1);
    }
    animId1 = requestAnimationFrame(animateFireworks);
  }

  function animateSparks() {
    ckCtx.clearRect(0, 0, W, H);
    for (let i = sparks.length - 1; i >= 0; i--) {
      sparks[i].update();
      sparks[i].draw(ckCtx);
      if (sparks[i].alpha <= 0) sparks.splice(i, 1);
    }
    animId2 = requestAnimationFrame(animateSparks);
  }

  animateFireworks();
  animateSparks();
  setTimeout(autoFirework, 1500);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
  document.removeEventListener("click", onClick);
  cancelAnimationFrame(animId1);
  cancelAnimationFrame(animId2);
  clearTimeout(autoTimer);
});
</script>

<style scoped>
.fw-canvas,
.click-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.fw-canvas {
  z-index: 1;
}
.click-canvas {
  z-index: 10;
}
</style>
