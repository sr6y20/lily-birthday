<template>
  <div class="washi-texture"></div>
</template>

<style scoped>
.washi-texture {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.02) 2px,
      rgba(255, 255, 255, 0.02) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(255, 255, 255, 0.02) 2px,
      rgba(255, 255, 255, 0.02) 4px
    );
  background-size: 4px 4px;
  mix-blend-mode: overlay;
}
</style>
