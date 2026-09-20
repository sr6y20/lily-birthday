<template>
  <canvas ref="canvas" class="mouse-trail"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let ctx, W, H;
let particles = [];
let animId;

class TrailParticle {
  constructor(x, y) {
    this.x = x + (Math.random() - 0.5) * 6;
    this.y = y + (Math.random() - 0.5) * 6;
    this.alpha = 1;
    this.decay = Math.random() * 0.02 + 0.015;
    this.size = Math.random() * 3 + 1;
    this.vy = Math.random() * 0.5 + 0.2;
    this.vx = (Math.random() - 0.5) * 0.3;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }
  draw(ctx) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = "#f0c27f";
    ctx.shadowBlur = 6;
    ctx.shadowColor = "rgba(240, 194, 127, 0.6)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function onMove(e) {
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;
  for (let i = 0; i < 2; i++) particles.push(new TrailParticle(x, y));
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
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });

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
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
  window.removeEventListener("mousemove", onMove);
  window.removeEventListener("touchmove", onMove);
  cancelAnimationFrame(animId);
});
</script>

<style scoped>
.mouse-trail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  pointer-events: none;
}
</style>
