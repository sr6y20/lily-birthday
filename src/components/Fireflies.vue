<template>
  <div class="fireflies-layer" ref="container"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const container = ref(null);
let flies = [];
let animId;

class Firefly {
  constructor(parent) {
    this.el = document.createElement("div");
    this.el.className = "firefly-dot";
    this.parent = parent;
    this.reset();
    parent.appendChild(this.el);
  }
  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.phase = Math.random() * Math.PI * 2;
    this.glowSpeed = Math.random() * 0.02 + 0.01;
    this.size = Math.random() * 4 + 3;
  }
  update() {
    this.x += this.vx + Math.sin(this.phase * 0.5) * 0.2;
    this.y += this.vy + Math.cos(this.phase * 0.3) * 0.15;
    this.phase += this.glowSpeed;
    const opacity = ((Math.sin(this.phase) + 1) / 2) * 0.7 + 0.1;
    const scale = 0.8 + Math.sin(this.phase) * 0.3;
    this.el.style.transform = `translate(${this.x}px, ${this.y}px) scale(${scale})`;
    this.el.style.opacity = opacity;
    // wrap around
    if (this.x < -20) this.x = window.innerWidth + 20;
    if (this.x > window.innerWidth + 20) this.x = -20;
    if (this.y < -20) this.y = window.innerHeight + 20;
    if (this.y > window.innerHeight + 20) this.y = -20;
  }
}

onMounted(() => {
  const count = window.innerWidth <= 600 ? 10 : 20;
  for (let i = 0; i < count; i++) {
    flies.push(new Firefly(container.value));
  }

  function animate() {
    for (const f of flies) f.update();
    animId = requestAnimationFrame(animate);
  }
  animate();
});

onUnmounted(() => {
  cancelAnimationFrame(animId);
  for (const f of flies) f.el.remove();
  flies = [];
});
</script>

<style scoped>
.fireflies-layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}
</style>

<style>
.firefly-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(240, 220, 120, 0.9) 0%,
    rgba(180, 200, 80, 0.4) 50%,
    transparent 100%
  );
  box-shadow: 0 0 8px 3px rgba(220, 210, 100, 0.3);
  will-change: transform, opacity;
}
</style>
