<template>
  <button class="music-btn" :class="{ paused: !playing }" @click="toggle">
    <svg
      class="note"
      :class="{ spinning: playing }"
      viewBox="0 0 24 24"
      fill="#f0c27f"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3v10.55c-.59-.34-1.27-.55-2-.55C7.79 13 6 14.79 6 17s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
    </svg>
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
  width: 52px;
  height: 52px;
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
.note {
  width: 55%;
  height: 55%;
  display: block;
  transition: transform 0.3s;
  opacity: 0.4;
}
.music-btn:not(.paused) .note {
  opacity: 1;
}
.note.spinning {
  animation: noteSwing 1.5s ease-in-out infinite;
}
.paused .note {
  opacity: 0.3;
}

@keyframes noteSwing {
  0%,
  100% {
    transform: rotate(-10deg) scale(1);
  }
  50% {
    transform: rotate(10deg) scale(1.15);
  }
}
</style>
