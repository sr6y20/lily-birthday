<template>
  <canvas ref="canvas" class="shooting-stars"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let ctx, W, H;
let stars = [];
let animId;
let spawnTimer;

class ShootingStar {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * W * 0.8;
    this.y = Math.random() * H * 0.3;
    const angle = Math.PI / 6 + Math.random() * 0.3;
    const speed = Math.random() * 8 + 6;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.length = Math.random() * 80 + 60;
    this.alpha = 1;
    this.decay = Math.random() * 0.012 + 0.008;
    this.thickness = Math.random() * 1.5 + 0.5;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }
  draw(ctx) {
    if (this.alpha <= 0) return;
    const tailX =
      this.x - (this.vx / Math.sqrt(this.vx ** 2 + this.vy ** 2)) * this.length;
    const tailY =
      this.y - (this.vy / Math.sqrt(this.vx ** 2 + this.vy ** 2)) * this.length;
    const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
    grad.addColorStop(0, `rgba(255, 255, 255, ${this.alpha})`);
    grad.addColorStop(0.3, `rgba(240, 194, 127, ${this.alpha * 0.6})`);
    grad.addColorStop(1, `rgba(240, 194, 127, 0)`);
    ctx.save();
    ctx.strokeStyle = grad;
    ctx.lineWidth = this.thickness;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();
    // head glow
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.thickness + 1, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.8})`;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#fff";
    ctx.fill();
    ctx.restore();
  }
}

function resize() {
  W = window.innerWidth;
  H = window.innerHeight;
  if (canvas.value) {
    canvas.value.width = W;
    canvas.value.height = H;
  }
}

function spawnStar() {
  stars.push(new ShootingStar());
  spawnTimer = setTimeout(spawnStar, Math.random() * 4000 + 3000);
}

onMounted(() => {
  resize();
  ctx = canvas.value.getContext("2d");
  window.addEventListener("resize", resize);

  function animate() {
    ctx.clearRect(0, 0, W, H);
    for (let i = stars.length - 1; i >= 0; i--) {
      stars[i].update();
      stars[i].draw(ctx);
      if (stars[i].alpha <= 0) stars.splice(i, 1);
    }
    animId = requestAnimationFrame(animate);
  }
  animate();
  setTimeout(spawnStar, 2000);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
  cancelAnimationFrame(animId);
  clearTimeout(spawnTimer);
});
</script>

<style scoped>
.shooting-stars {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
</style>
