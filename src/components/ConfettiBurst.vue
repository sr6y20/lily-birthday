<template>
  <canvas ref="canvas" class="confetti-canvas"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let ctx, W, H;
let particles = [];
let animId;

const colors = [
  "#f0c27f",
  "#f5a6c7",
  "#ffe4c9",
  "#c090c8",
  "#ff9500",
  "#fff5e0",
  "#ff6b8a",
  "#7ec8e3",
];

class Confetti {
  constructor() {
    this.x = W / 2 + (Math.random() - 0.5) * W * 0.3;
    this.y = H / 2;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 12 + 5;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - Math.random() * 6;
    this.gravity = 0.15;
    this.alpha = 1;
    this.decay = Math.random() * 0.005 + 0.003;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.size = Math.random() * 6 + 3;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 10;
    this.shape = Math.random() > 0.5 ? "rect" : "circle";
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.vx *= 0.99;
    this.rotation += this.rotSpeed;
    this.alpha -= this.decay;
  }
  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    if (this.shape === "rect") {
      ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function burst() {
  const count = window.innerWidth <= 600 ? 60 : 120;
  for (let i = 0; i < count; i++) particles.push(new Confetti());
}

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  if (canvas.value) {
    canvas.value.width = W;
    canvas.value.height = H;
  }
}

onMounted(() => {
  resize();
  ctx = canvas.value.getContext("2d");
  window.addEventListener("resize", resize);

  function animate() {
    ctx.clearRect(0, 0, W, H);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].alpha <= 0) particles.splice(i, 1);
    }
    animId = requestAnimationFrame(animate);
  }
  animate();

  // burst on load with slight delay
  setTimeout(burst, 800);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
  cancelAnimationFrame(animId);
});
</script>

<style scoped>
.confetti-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 15;
  pointer-events: none;
}
</style>
