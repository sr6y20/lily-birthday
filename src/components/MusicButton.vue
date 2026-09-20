<template>
  <button class="music-btn" :class="{ paused: !playing }" @click="toggle">
    <div class="bars">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </button>
</template>

<script setup>
import { ref, onUnmounted } from "vue";

const playing = ref(false);
let audioCtx = null;
let intervalId = null;

const melody = [
  { note: 262, dur: 0.3 },
  { note: 262, dur: 0.3 },
  { note: 294, dur: 0.6 },
  { note: 262, dur: 0.6 },
  { note: 349, dur: 0.6 },
  { note: 330, dur: 1.0 },
  { note: 262, dur: 0.3 },
  { note: 262, dur: 0.3 },
  { note: 294, dur: 0.6 },
  { note: 262, dur: 0.6 },
  { note: 392, dur: 0.6 },
  { note: 349, dur: 1.0 },
  { note: 262, dur: 0.3 },
  { note: 262, dur: 0.3 },
  { note: 523, dur: 0.6 },
  { note: 440, dur: 0.6 },
  { note: 349, dur: 0.6 },
  { note: 330, dur: 0.6 },
  { note: 294, dur: 1.0 },
  { note: 466, dur: 0.3 },
  { note: 466, dur: 0.3 },
  { note: 440, dur: 0.6 },
  { note: 349, dur: 0.6 },
  { note: 392, dur: 0.6 },
  { note: 349, dur: 1.2 },
];

function playNote(freq, startTime, duration) {
  if (!audioCtx) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(0.08, startTime + 0.05);
  gain.gain.linearRampToValueAtTime(0, startTime + duration);
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

function playMelody() {
  if (!audioCtx) return 0;
  let t = audioCtx.currentTime + 0.1;
  melody.forEach(n => {
    playNote(n.note, t, n.dur * 0.9);
    t += n.dur;
  });
  return t - audioCtx.currentTime;
}

function toggle() {
  playing.value = !playing.value;
  if (playing.value) {
    if (!audioCtx)
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const dur = playMelody();
    intervalId = setInterval(() => {
      if (playing.value) playMelody();
    }, dur * 1000);
  } else {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
  }
}

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.music-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 20;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(240, 194, 127, 0.3);
  background: rgba(10, 10, 26, 0.8);
  backdrop-filter: blur(10px);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.music-btn:hover {
  border-color: #f0c27f;
  box-shadow: 0 0 20px rgba(240, 194, 127, 0.2);
}
.bars {
  display: flex;
  gap: 3px;
  align-items: center;
  height: 18px;
}
.bar {
  width: 3px;
  background: #f0c27f;
  border-radius: 2px;
  animation: musicBar 0.8s ease-in-out infinite;
}
.bar:nth-child(1) {
  height: 8px;
  animation-delay: 0s;
}
.bar:nth-child(2) {
  height: 14px;
  animation-delay: 0.2s;
}
.bar:nth-child(3) {
  height: 10px;
  animation-delay: 0.4s;
}
.bar:nth-child(4) {
  height: 16px;
  animation-delay: 0.1s;
}
.paused .bar {
  animation-play-state: paused;
  height: 3px;
}

@keyframes musicBar {
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.4);
  }
}
</style>
