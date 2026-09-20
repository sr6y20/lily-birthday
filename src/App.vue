<template>
  <div class="app">
    <WashiTexture />
    <FireworksCanvas ref="fireworksRef" />
    <StarField />
    <ShootingStars />
    <SakuraEffect />
    <Fireflies />
    <MouseTrail />
    <ConfettiBurst />

    <!-- Origami Cranes -->
    <OrigamiCrane
      v-for="i in craneCount"
      :key="i"
      :delay="i * 2"
      :duration="12 + i"
      :startX="10 + i * 15"
      :startY="20 + i * 10" />

    <!-- Japanese Lanterns -->
    <JapaneseLantern :x="15" :y="25" :size="45" :delay="0" />
    <JapaneseLantern :x="85" :y="30" :size="50" :delay="1" />
    <JapaneseLantern :x="10" :y="70" :size="40" :delay="2" />
    <JapaneseLantern :x="90" :y="75" :size="48" :delay="0.5" />

    <LangSwitcher />

    <section class="hero" data-parallax="0.3">
      <ToriiGate />
      <div class="japanese-pattern top-left"></div>
      <div class="japanese-pattern top-right"></div>
      <h1 class="hero-kanji" v-html="nl2br(t('hero.title'))"></h1>
      <p class="hero-sub">{{ t("hero.subtitle") }}</p>
      <p class="hero-date">{{ t("hero.date") }}</p>
      <div class="hero-line"></div>
      <div class="scroll-hint">
        <span>SCROLL</span>
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <section class="cake-section" data-parallax="0.15">
      <div class="reveal">
        <BirthdayCake @allBlown="onCakeAllBlown" />
      </div>
    </section>

    <section class="haiku-section" data-parallax="0.1">
      <div class="haiku-card reveal">
        <div class="haiku-kanji">歌</div>
        <h2 class="haiku-title">{{ t("haiku.title") }}</h2>
        <div class="haiku-poem">
          <p class="haiku-line">{{ t("haiku.line1") }}</p>
          <p class="haiku-line">{{ t("haiku.line2") }}</p>
          <p class="haiku-line">{{ t("haiku.line3") }}</p>
        </div>
        <div class="haiku-divider"></div>
      </div>
    </section>

    <section class="message-section" data-parallax="0.1">
      <div class="message-card reveal">
        <h2 class="message-title">{{ t("message.title") }}</h2>
        <div class="message-text">
          <p v-html="nl2br(t('message.p1'))"></p>
          <p v-html="nl2br(t('message.p2'))"></p>
          <p v-html="nl2br(t('message.p3'))"></p>
        </div>
        <div class="message-signature">{{ t("message.signature") }}</div>
      </div>
    </section>

    <section class="wishes-section">
      <div class="wishes-grid">
        <div v-for="(wish, i) in wishes" :key="i" class="wish-card reveal">
          <span class="wish-icon">{{ wish.icon }}</span>
          <div class="wish-label">{{ wish.label }}</div>
          <div class="wish-desc" v-html="nl2br(wish.desc)"></div>
        </div>
      </div>
    </section>

    <section class="timeline-section">
      <h2 class="timeline-title reveal">{{ t("timeline.title") }}</h2>
      <div class="timeline">
        <div class="timeline-item reveal" v-for="i in 4" :key="i">
          <div class="timeline-dot"></div>
          <div class="timeline-time">{{ t(`timeline.moment${i}.time`) }}</div>
          <div class="timeline-text">{{ t(`timeline.moment${i}.text`) }}</div>
        </div>
      </div>
    </section>

    <!-- TODO: Memory Gallery - enable when images are ready -->
    <!-- <MemoryGallery /> -->

    <section class="footer">
      <div class="reveal">
        <div class="footer-text">
          {{ t("footer.text") }}<br />
          <span class="footer-sub">{{ t("footer.subtext") }}</span>
        </div>
        <div class="footer-year">REIWA · 2026</div>
      </div>
    </section>

    <MusicButton />
    <FloatingWish />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, onUnmounted, nextTick } from "vue";
import { useI18n } from "vue-i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FireworksCanvas from "./components/FireworksCanvas.vue";
import StarField from "./components/StarField.vue";
import SakuraEffect from "./components/SakuraEffect.vue";
import BirthdayCake from "./components/BirthdayCake.vue";
import MusicButton from "./components/MusicButton.vue";
import LangSwitcher from "./components/LangSwitcher.vue";
import ToriiGate from "./components/ToriiGate.vue";
import OrigamiCrane from "./components/OrigamiCrane.vue";
import JapaneseLantern from "./components/JapaneseLantern.vue";
import WashiTexture from "./components/WashiTexture.vue";
import ShootingStars from "./components/ShootingStars.vue";
import Fireflies from "./components/Fireflies.vue";
import MouseTrail from "./components/MouseTrail.vue";
import ConfettiBurst from "./components/ConfettiBurst.vue";
import FloatingWish from "./components/FloatingWish.vue";
// TODO: MemoryGallery - placeholder for future photo gallery
// import MemoryGallery from "./components/MemoryGallery.vue";

gsap.registerPlugin(ScrollTrigger);

const { t, tm } = useI18n();

const wishes = computed(() => tm("wishes"));

const isMobile = ref(false);
const craneCount = computed(() => (isMobile.value ? 3 : 5));
const fireworksRef = ref(null);

function checkMobile() {
  isMobile.value = window.innerWidth <= 600;
}

function nl2br(str) {
  if (!str) return "";
  return str.replace(/\n/g, "<br>");
}

// Scroll chime sound
let chimeCtx = null;

function playScrollChime() {
  if (!chimeCtx)
    chimeCtx = new (window.AudioContext || window.webkitAudioContext)();
  const notes = [659, 784, 880, 1047];
  const note = notes[Math.floor(Math.random() * notes.length)];
  const osc = chimeCtx.createOscillator();
  const gain = chimeCtx.createGain();
  osc.type = "sine";
  osc.frequency.value = note;
  gain.gain.setValueAtTime(0, chimeCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.03, chimeCtx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, chimeCtx.currentTime + 0.8);
  osc.connect(gain);
  gain.connect(chimeCtx.destination);
  osc.start(chimeCtx.currentTime);
  osc.stop(chimeCtx.currentTime + 0.8);
}

function onCakeAllBlown() {
  const event = new MouseEvent("click", {
    clientX: window.innerWidth / 2,
    clientY: window.innerHeight / 2,
    bubbles: true,
  });
  document.dispatchEvent(event);
}

let scrollTriggers = [];

onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);

  nextTick(() => {
    // Reveal animations with GSAP ScrollTrigger
    gsap.utils.toArray(".reveal").forEach(el => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        },
      );
    });

    // Parallax scrolling with GSAP
    gsap.utils.toArray("[data-parallax]").forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      gsap.to(el, {
        y: () => window.scrollY * speed,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    // Scroll chime per section
    document.querySelectorAll("section").forEach(section => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        once: true,
        onEnter: () => playScrollChime(),
      });
      scrollTriggers.push(st);
    });
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
  ScrollTrigger.getAll().forEach(st => st.kill());
  scrollTriggers = [];
  if (chimeCtx) chimeCtx.close();
});
</script>

<style>
:root {
  --gold: #f0c27f;
  --pink: #f5a6c7;
  --warm: #ffe4c9;
  --deep: #0a0a1a;
  --purple: #2d1b4e;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
}

body {
  background: var(--deep);
  color: #fff;
  font-family: "Zen Maru Gothic", "Noto Serif JP", serif;
  overflow-x: hidden;
  cursor: default;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  min-height: 100vh;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

section {
  position: relative;
  z-index: 5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
}

/* Hero */
.hero {
  text-align: center;
  perspective: 800px;
}

.japanese-pattern {
  position: absolute;
  width: 80px;
  height: 80px;
  opacity: 0.15;
  background-image:
    linear-gradient(45deg, var(--gold) 25%, transparent 25%),
    linear-gradient(-45deg, var(--gold) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--gold) 75%),
    linear-gradient(-45deg, transparent 75%, var(--gold) 75%);
  background-size: 20px 20px;
  background-position:
    0 0,
    0 10px,
    10px -10px,
    -10px 0px;
}

.japanese-pattern.top-left {
  top: 15%;
  left: 10%;
  animation: rotatePattern 20s linear infinite;
}

.japanese-pattern.top-right {
  top: 15%;
  right: 10%;
  animation: rotatePattern 20s linear infinite reverse;
}

@keyframes rotatePattern {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hero-kanji {
  font-family: "Noto Serif JP", serif;
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 700;
  background: linear-gradient(
    135deg,
    var(--gold),
    #fff5e0,
    var(--pink),
    var(--gold)
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s ease-in-out infinite;
  filter: drop-shadow(0 0 30px rgba(240, 194, 127, 0.3));
  letter-spacing: 0.15em;
  line-height: 1.4;
}

@keyframes shimmer {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.hero-sub {
  font-size: clamp(1rem, 3vw, 1.6rem);
  color: rgba(255, 228, 201, 0.7);
  margin-top: 20px;
  font-weight: 300;
  letter-spacing: 0.3em;
  opacity: 0;
  animation: fadeUp 1.5s 1s forwards;
}

.hero-date {
  font-size: clamp(0.8rem, 2vw, 1rem);
  color: rgba(255, 228, 201, 0.4);
  margin-top: 12px;
  font-weight: 300;
  letter-spacing: 0.4em;
  opacity: 0;
  animation: fadeUp 1.5s 1.3s forwards;
}

.hero-line {
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 30px auto;
  opacity: 0;
  animation: fadeUp 1.5s 1.5s forwards;
}

.scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0;
  animation: fadeUp 1.5s 2s forwards;
}
.scroll-hint span {
  font-size: 0.75rem;
  color: rgba(255, 228, 201, 0.4);
  letter-spacing: 0.2em;
}
.scroll-arrow {
  width: 20px;
  height: 20px;
  border-right: 1px solid rgba(240, 194, 127, 0.4);
  border-bottom: 1px solid rgba(240, 194, 127, 0.4);
  transform: rotate(45deg);
  animation: bounce 2s infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0) rotate(45deg);
  }
  50% {
    transform: translateY(8px) rotate(45deg);
  }
}
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Cake Section */
.cake-section {
  background: radial-gradient(
    ellipse at 50% 80%,
    rgba(45, 27, 78, 0.6) 0%,
    transparent 70%
  );
}

/* Message Section */
.message-section {
  background: radial-gradient(
    ellipse at 50% 30%,
    rgba(45, 27, 78, 0.4) 0%,
    transparent 70%
  );
}
.message-card {
  width: 90%;
  max-width: 900px;
  padding: 50px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(240, 194, 127, 0.15);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  text-align: center;
  position: relative;
  overflow: hidden;
}
.message-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--gold) 20%,
    var(--pink) 50%,
    var(--gold) 80%,
    transparent 100%
  );
}
.message-card::after {
  content: "❋";
  position: absolute;
  bottom: 15px;
  right: 20px;
  font-size: 1.2rem;
  color: rgba(240, 194, 127, 0.2);
}

.message-card-decoration {
  position: absolute;
  top: 15px;
  left: 20px;
  font-size: 1.2rem;
  color: rgba(240, 194, 127, 0.2);
}
.message-title {
  font-family: "Noto Serif JP", serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 500;
  color: var(--gold);
  margin-bottom: 30px;
  letter-spacing: 0.1em;
}
.message-text {
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  line-height: 2.2;
  color: rgba(255, 228, 201, 0.85);
  font-weight: 300;
  letter-spacing: 0.05em;
}
.message-text p {
  margin-bottom: 20px;
}
.message-signature {
  margin-top: 30px;
  font-size: 0.9rem;
  color: rgba(245, 166, 199, 0.6);
  font-style: italic;
}

/* Wishes */
.wishes-section {
  padding: 80px 20px;
}
.wishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 900px;
  width: 100%;
}
.wish-card {
  padding: 36px 28px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(240, 194, 127, 0.08);
  border-radius: 20px;
  text-align: center;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
}
.wish-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(240, 194, 127, 0.06) 0%,
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.5s;
}
.wish-card:hover {
  transform: translateY(-8px);
  border-color: rgba(240, 194, 127, 0.25);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
.wish-card:hover::before {
  opacity: 1;
}
.wish-icon {
  font-size: 2.2rem;
  margin-bottom: 16px;
  display: block;
}
.wish-label {
  font-family: "Noto Serif JP", serif;
  font-size: 1.1rem;
  color: var(--gold);
  margin-bottom: 10px;
  letter-spacing: 0.1em;
}
.wish-desc {
  font-size: 0.85rem;
  color: rgba(255, 228, 201, 0.5);
  line-height: 1.8;
  font-weight: 300;
}

/* Haiku Section */
.haiku-section {
  background: radial-gradient(
    ellipse at 50% 50%,
    rgba(45, 27, 78, 0.3) 0%,
    transparent 70%
  );
}
.haiku-card {
  width: 85%;
  max-width: 900px;
  padding: 60px 40px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(240, 194, 127, 0.1);
  border-radius: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.haiku-kanji {
  font-family: "Noto Serif JP", serif;
  font-size: 4rem;
  color: rgba(240, 194, 127, 0.08);
  position: absolute;
  top: 20px;
  right: 30px;
  line-height: 1;
}
.haiku-title {
  font-family: "Noto Serif JP", serif;
  font-size: clamp(1.1rem, 3vw, 1.4rem);
  color: rgba(240, 194, 127, 0.5);
  font-weight: 300;
  letter-spacing: 0.2em;
  margin-bottom: 40px;
}
.haiku-poem {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.haiku-line {
  font-family: "Noto Serif JP", serif;
  font-size: clamp(1.2rem, 3.5vw, 1.6rem);
  color: rgba(255, 228, 201, 0.85);
  font-weight: 300;
  letter-spacing: 0.15em;
  line-height: 1.8;
}
.haiku-divider {
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--pink), transparent);
  margin: 40px auto 0;
}

/* Timeline Section */
.timeline-section {
  padding: 100px 20px;
}
.timeline-title {
  font-family: "Noto Serif JP", serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  font-weight: 500;
  color: var(--gold);
  margin-bottom: 60px;
  letter-spacing: 0.15em;
  text-align: center;
}
.timeline {
  position: relative;
  max-width: 600px;
  width: 100%;
  padding-left: 40px;
}
.timeline::before {
  content: "";
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 1px;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(240, 194, 127, 0.3),
    transparent
  );
}
.timeline-item {
  position: relative;
  padding: 0 0 50px 30px;
}
.timeline-item:last-child {
  padding-bottom: 0;
}
.timeline-dot {
  position: absolute;
  left: -36px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--gold);
  box-shadow: 0 0 12px rgba(240, 194, 127, 0.4);
}
.timeline-time {
  font-family: "Noto Serif JP", serif;
  font-size: 1.3rem;
  color: var(--pink);
  letter-spacing: 0.2em;
  margin-bottom: 8px;
}
.timeline-text {
  font-size: clamp(0.9rem, 2.5vw, 1.05rem);
  color: rgba(255, 228, 201, 0.65);
  font-weight: 300;
  letter-spacing: 0.08em;
  line-height: 1.8;
}

/* Footer */
.footer {
  min-height: 50vh;
  text-align: center;
}
.footer-text {
  font-family: "Noto Serif JP", serif;
  font-size: clamp(1.8rem, 5vw, 3rem);
  background: linear-gradient(135deg, var(--pink), var(--gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.15em;
  line-height: 1.6;
}
.footer-sub {
  font-size: 0.6em;
  opacity: 0.7;
}
.footer-year {
  margin-top: 20px;
  font-size: 0.85rem;
  color: rgba(255, 228, 201, 0.3);
  letter-spacing: 0.3em;
}

/* Reveal */
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 768px) {
  .japanese-pattern {
    width: 50px;
    height: 50px;
  }
  .japanese-pattern.top-left {
    top: 10%;
    left: 5%;
  }
  .japanese-pattern.top-right {
    top: 10%;
    right: 5%;
  }
}

@media (max-width: 600px) {
  section {
    min-height: auto;
    padding: 50px 16px;
  }

  section.hero {
    min-height: 85vh;
    padding: 60px 16px;
  }

  .message-card {
    padding: 36px 24px;
  }

  .wishes-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .wish-card {
    padding: 28px 20px;
  }

  .japanese-pattern {
    width: 40px;
    height: 40px;
    opacity: 0.1;
  }

  .hero-sub {
    letter-spacing: 0.15em;
  }

  .message-text {
    line-height: 2;
  }

  .footer-text {
    font-size: clamp(1.5rem, 6vw, 2.5rem);
  }

  .lang-switcher {
    top: 16px;
    right: 16px;
  }

  .lang-switcher button {
    padding: 5px 10px;
    font-size: 0.7rem;
  }

  .haiku-card {
    padding: 36px 24px;
  }

  .haiku-kanji {
    font-size: 2.5rem;
    top: 12px;
    right: 16px;
  }

  .haiku-title {
    font-size: 1rem;
    margin-bottom: 28px;
  }

  .haiku-line {
    font-size: 1.05rem;
  }

  .haiku-poem {
    gap: 14px;
  }

  .haiku-divider {
    margin-top: 28px;
  }

  .timeline-section {
    padding: 50px 16px;
  }

  .timeline {
    padding-left: 28px;
  }

  .timeline-dot {
    left: -24px;
    width: 8px;
    height: 8px;
  }

  .timeline-item {
    padding-left: 18px;
    padding-bottom: 30px;
  }

  .timeline-title {
    margin-bottom: 32px;
    font-size: 1.3rem;
  }

  .timeline-time {
    font-size: 1.1rem;
  }

  .timeline-text {
    font-size: 0.9rem;
  }

  .cake-section {
    padding: 40px 16px;
  }
}

@media (max-width: 380px) {
  .hero-kanji {
    font-size: clamp(2rem, 10vw, 3rem);
  }

  .message-card {
    padding: 28px 20px;
  }

  .message-title {
    font-size: 1.3rem;
  }

  .message-text {
    font-size: 0.9rem;
  }
}
</style>
