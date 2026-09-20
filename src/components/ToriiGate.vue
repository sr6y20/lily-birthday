<template>
  <div class="torii-gate">
    <svg viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="toriiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color: #c41e3a; stop-opacity: 0.9" />
          <stop offset="100%" style="stop-color: #8b1425; stop-opacity: 0.7" />
        </linearGradient>
      </defs>
      <!-- Top beam (kasagi) -->
      <path
        d="M 20 40 Q 100 30 180 40 L 180 50 Q 100 40 20 50 Z"
        fill="url(#toriiGrad)" />
      <!-- Second beam (nuki) -->
      <rect
        x="30"
        y="60"
        width="140"
        height="12"
        rx="2"
        fill="url(#toriiGrad)" />
      <!-- Left pillar -->
      <rect
        x="45"
        y="50"
        width="14"
        height="190"
        rx="2"
        fill="url(#toriiGrad)" />
      <!-- Right pillar -->
      <rect
        x="141"
        y="50"
        width="14"
        height="190"
        rx="2"
        fill="url(#toriiGrad)" />
      <!-- Center support (gakuzuka) -->
      <rect
        x="90"
        y="50"
        width="20"
        height="15"
        rx="1"
        fill="url(#toriiGrad)" />
    </svg>
  </div>
</template>

<style scoped>
.torii-gate {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 180px;
  opacity: 0.15;
  z-index: 0;
  pointer-events: none;
  animation: fadeIn 3s ease-in forwards;
}

@keyframes fadeIn {
  to {
    opacity: 0.25;
  }
}

@media (max-width: 768px) {
  .torii-gate {
    width: 140px;
  }
}

@media (max-width: 600px) {
  .torii-gate {
    width: 100px;
    top: 8%;
  }
}

@media (max-width: 380px) {
  .torii-gate {
    width: 80px;
  }
}
</style>
