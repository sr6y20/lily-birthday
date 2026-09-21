<template>
  <div class="app" ref="appRef" :data-wish="wishes[0]?.id">
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
      <p class="hero-date">{{ t("hero.date", dateParams) }}</p>
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
      <div class="journey-marker journey-marker--start" aria-hidden="true">
        <svg class="journey-spark" viewBox="0 0 100 100" focusable="false">
          <path
            class="journey-spark-base"
            d="M50 4 62 35 96 38 70 60 78 94 50 76 22 94 30 60 4 38 38 35Z" />
          <path
            class="journey-spark-fold"
            d="M50 4 50 52 4 38 38 35ZM50 52 78 94 50 76 22 94ZM50 52 96 38 70 60Z" />
          <path
            class="journey-spark-crease"
            d="M50 4V52L22 94M4 38 50 52 96 38M50 52 78 94" />
          <text class="journey-spark-symbol" x="50" y="61" text-anchor="middle">
            {{ wishes[0]?.icon }}
          </text>
        </svg>
      </div>
      <h2 class="wishes-title">{{ t("wishes.title") }}</h2>
      <button
        ref="wishSlider"
        class="wish-slider"
        type="button"
        :aria-label="t('wishes.hint')"
        aria-describedby="current-wish-label current-wish-desc"
        @click="flipWish">
        <span
          v-for="(wish, position) in wishes"
          :key="wish.id"
          class="wish-card"
          :aria-hidden="position !== 0">
          <span class="wish-icon" aria-hidden="true">{{ wish.icon }}</span>
          <span
            :id="position === 0 ? 'current-wish-label' : undefined"
            class="wish-label"
            >{{ wish.label }}</span
          >
          <span
            :id="position === 0 ? 'current-wish-desc' : undefined"
            class="wish-desc"
            >{{ wish.desc }}</span
          >
        </span>
      </button>
      <p class="wish-hint">{{ t("wishes.hint") }}</p>
      <p class="journey-hint">{{ t("letter.journeyHint") }}</p>
    </section>

    <section class="timeline-section">
      <div
        class="journey-marker journey-marker--middle"
        aria-hidden="true"></div>
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
      <div class="birthday-delivery">
        <p class="delivery-caption">{{ t("letter.delivery") }}</p>
        <button
          ref="envelopeButton"
          class="envelope-button"
          type="button"
          :aria-expanded="letterOpen"
          aria-controls="birthday-letter"
          @click="letterOpen ? closeLetter() : openLetter()">
          <span
            class="journey-marker journey-marker--end"
            aria-hidden="true"></span>
          <span class="envelope-art" aria-hidden="true">
            <span class="envelope-note"></span>
            <span class="envelope-flap"></span>
            <span class="envelope-stamp">{{ wishes[0]?.icon }}</span>
          </span>
          <span class="envelope-action">
            {{ t(letterOpen ? "letter.close" : "letter.open") }}
          </span>
        </button>
        <p class="delivery-wish">
          {{ t("letter.carrying", { wish: wishes[0]?.label }) }}
        </p>
      </div>
      <Transition
        :css="false"
        @enter="(el, done) => animateLetter(el, done, true)"
        @leave="(el, done) => animateLetter(el, done, false)"
        @enter-cancelled="cancelLetterAnimation"
        @leave-cancelled="cancelLetterAnimation"
        @after-leave="showKeepsake">
        <article
          v-show="letterOpen"
          id="birthday-letter"
          class="birthday-letter"
          :class="{ 'is-folding': !letterOpen }"
          :inert="!letterOpen"
          :aria-hidden="!letterOpen"
          aria-labelledby="birthday-letter-title">
          <p class="letter-date">{{ t("hero.date", dateParams) }}</p>
          <h2 id="birthday-letter-title">{{ t("letter.title") }}</h2>
          <p class="letter-line letter-salutation">
            {{ t("letter.salutation") }}
          </p>
          <p v-for="i in 3" :key="i" class="letter-line letter-paragraph">
            {{ t(`letter.p${i}`) }}
          </p>
          <blockquote class="letter-line letter-keepsake">
            {{ wishes[0]?.desc }}
          </blockquote>
          <p class="letter-line letter-signature">
            {{ t("message.signature") }}
          </p>
          <svg
            ref="letterMotif"
            class="letter-motif"
            viewBox="0 0 360 120"
            aria-hidden="true">
            <path
              v-for="(d, i) in wishMotif.strokes"
              :key="`line-${wishes[0].id}-${i}`"
              class="motif-line"
              :d="d" />
            <path
              v-for="(d, i) in wishMotif.accents"
              :key="`accent-${wishes[0].id}-${i}`"
              class="motif-accent"
              :d="d" />
          </svg>
          <button class="letter-close" type="button" @click="closeLetter">
            {{ t("letter.close") }}
          </button>
        </article>
      </Transition>
      <div
        v-show="keepsakeVisible && !letterOpen"
        ref="keepsakePanel"
        class="keepsake-panel"
        :inert="!keepsakeVisible || letterOpen">
        <article class="keepsake-card" aria-labelledby="keepsake-title">
          <p class="keepsake-eyebrow">{{ t("keepsake.title") }}</p>
          <p class="keepsake-date">{{ t("hero.date", dateParams) }}</p>
          <svg class="keepsake-motif" viewBox="0 0 360 120" aria-hidden="true">
            <path
              v-for="(d, i) in wishMotif.strokes"
              :key="`line-${i}`"
              class="motif-line"
              :d="d" />
            <path
              v-for="(d, i) in wishMotif.accents"
              :key="`accent-${i}`"
              class="motif-accent"
              :d="d" />
          </svg>
          <h2 id="keepsake-title">{{ wishes[0]?.label }}</h2>
          <p class="keepsake-description">{{ wishes[0]?.desc }}</p>
          <p class="keepsake-signature">{{ t("message.signature") }}</p>
          <p class="keepsake-greeting">{{ t("footer.subtext") }}</p>
        </article>
        <div class="keepsake-actions">
          <button ref="reopenButton" type="button" @click="openLetter">
            {{ t("keepsake.reopen") }}
          </button>
          <button type="button" :disabled="isSaving" @click="saveKeepsake">
            {{ t(isSaving ? "keepsake.saving" : "keepsake.save") }}
          </button>
        </div>
        <p class="keepsake-status" role="status" aria-live="polite">
          {{ exportStatus ? t(`keepsake.${exportStatus}`) : "" }}
        </p>
      </div>
      <div class="reveal">
        <div class="footer-text">
          {{ t("footer.text") }}<br />
          <span class="footer-sub">{{ t("footer.subtext") }}</span>
        </div>
        <div class="footer-year">REIWA · {{ currentYear }}</div>
      </div>
    </section>

    <MusicButton />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, onUnmounted, nextTick, watch } from "vue";
import { useI18n } from "vue-i18n";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
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
import "./App.css";
// TODO: MemoryGallery - placeholder for future photo gallery
// import MemoryGallery from "./components/MemoryGallery.vue";

gsap.registerPlugin(ScrollTrigger, Flip, DrawSVGPlugin);

const { t, tm, locale } = useI18n();

const currentYear = new Date().getFullYear();

// 生日日期支持地址栏传参：?date=2-26 或 ?date=2027-2-26，缺省 2 月 26 日。
const CN_NUMS = "〇一二三四五六七八九";
const CN_MONTHS = [
  "正",
  "二",
  "三",
  "四",
  "五",
  "六",
  "七",
  "八",
  "九",
  "十",
  "十一",
  "十二",
];
const EN_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const cnNum = n =>
  n < 10
    ? CN_NUMS[n]
    : n < 20
      ? "十" + (n % 10 ? CN_NUMS[n % 10] : "")
      : CN_NUMS[Math.floor(n / 10)] + "十" + (n % 10 ? CN_NUMS[n % 10] : "");
const ordinal = n => {
  const last2 = n % 100;
  if (last2 >= 11 && last2 <= 13) return n + "th";
  return n + ({ 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th");
};
const birthdayDate = computed(() => {
  const parts = (
    new URLSearchParams(window.location.search).get("date") || ""
  ).match(/^(?:(\d{4})-)?(\d{1,2})-(\d{1,2})$/);
  const year = parts ? +(parts[1] || currentYear) : currentYear;
  const month = parts ? +parts[2] : 2;
  const day = parts ? +parts[3] : 26;
  if (
    !parts ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31 ||
    !Number.isFinite(year)
  ) {
    return null;
  }
  const d = new Date(year, month - 1, day);
  if (
    d.getFullYear() !== year ||
    d.getMonth() !== month - 1 ||
    d.getDate() !== day
  ) {
    return null;
  }
  return {
    reiwa: year - 2018,
    cn: `${CN_MONTHS[month - 1]}月${cnNum(day)}日`,
    en: `${EN_MONTHS[month - 1]} ${ordinal(day)}`,
  };
});
const reiwaYear = computed(
  () => birthdayDate.value?.reiwa ?? currentYear - 2018,
);
const dateParams = computed(() => ({
  year: reiwaYear.value,
  monthDay:
    locale.value === "en"
      ? birthdayDate.value?.en || "February 26"
      : birthdayDate.value?.cn || "二月二十六日",
}));
const wishIndex = ref(0);
const wishes = computed(() => {
  const items = tm("wishes.items") || [];
  return items.map((_, position) => {
    const id = (wishIndex.value + position) % items.length;
    return { ...items[id], id };
  });
});
// 同一组路径供信末描画、纪念卡与 PNG 导出使用。
const motifVariants = [
  {
    strokes: [
      "M25 104C100 91 184 53 324 27",
      "M102 85Q91 62 70 43",
      "M174 60Q180 40 201 22",
      "M242 43Q262 63 291 70",
    ],
    accents: [
      "M70 43C49 44 47 28 62 28C54 12 74 8 76 25C90 13 100 29 84 35C101 47 87 62 78 47C72 65 54 59 63 46Z",
      "M201 22C185 23 183 11 195 11C190 0 203 0 205 11C217 2 225 14 211 18C226 26 216 37 208 26C204 39 189 35 195 26Z",
      "M291 70C272 72 268 56 283 56C275 41 294 39 297 54C310 44 320 58 304 64C319 74 308 87 300 75C294 90 280 84 285 74Z",
    ],
  },
  {
    strokes: [
      "M30 103C97 104 137 73 193 50S279 48 317 22",
      "M59 110C113 104 150 88 187 68",
      "M106 51V67M98 59H114",
    ],
    accents: [
      "M317 8L321 18L332 22L321 26L317 37L313 26L302 22L313 18Z",
      "M192 44L197 51L192 58L187 51Z",
      "M56 88A3 3 1 1 0 56 94A3 3 0 1 0 56 88Z",
    ],
  },
  {
    strokes: [
      "M22 37C73 6 120 26 155 59C183 85 197 91 213 73",
      "M338 94C286 122 236 103 203 66C177 38 163 33 148 53",
    ],
    accents: [
      "M177 65C143 75 136 37 158 37C178 37 179 77 199 77C222 77 214 42 187 57C163 69 153 95 138 101",
      "M179 63C196 81 210 92 224 105",
    ],
  },
];
const wishMotif = computed(
  () => motifVariants[wishes.value[0]?.id] || motifVariants[0],
);
const wishSlider = ref(null);
const letterOpen = ref(false);
const envelopeButton = ref(null);
const letterMotif = ref(null);
const keepsakePanel = ref(null);
const reopenButton = ref(null);
const keepsakeVisible = ref(false);
const exportStatus = ref("");
const isSaving = ref(false);
let letterAnimation;
let motifAnimation;
let motifTrigger;
let keepsakeAnimation;

function cancelMotifAnimation() {
  motifTrigger?.kill();
  motifAnimation?.revert();
  motifTrigger = motifAnimation = null;
}

function prepareMotif() {
  cancelMotifAnimation();
  if (
    !letterOpen.value ||
    !letterMotif.value ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
    return;
  motifAnimation = gsap
    .timeline({ paused: true })
    .fromTo(
      letterMotif.value.querySelectorAll(".motif-line"),
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: 1.1,
        stagger: 0.15,
        ease: "power1.inOut",
      },
    )
    .fromTo(
      letterMotif.value.querySelectorAll(".motif-accent"),
      { autoAlpha: 0, scale: 0.2 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.16,
        transformOrigin: "50% 50%",
        ease: "back.out(1.4)",
      },
      "-=0.25",
    );
}

function revealMotifWhenVisible() {
  if (!motifAnimation || !letterOpen.value) return;
  motifTrigger?.kill();
  motifTrigger = ScrollTrigger.create({
    trigger: letterMotif.value,
    start: "top 90%",
    once: true,
    animation: motifAnimation,
  });
}

watch(
  () => wishes.value[0]?.id,
  () => {
    exportStatus.value = "";
    prepareMotif();
    if (!letterAnimation?.isActive()) revealMotifWhenVisible();
  },
  { flush: "post" },
);

function openLetter() {
  keepsakeAnimation?.kill();
  keepsakeVisible.value = false;
  exportStatus.value = "";
  letterOpen.value = true;
  envelopeButton.value?.focus({ preventScroll: true });
}

async function showKeepsake() {
  keepsakeVisible.value = true;
  await nextTick();
  if (letterOpen.value || !keepsakePanel.value) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  keepsakeAnimation?.kill();
  const focusKeepsake = () => {
    if (document.activeElement === envelopeButton.value) {
      reopenButton.value?.focus({ preventScroll: true });
      keepsakePanel.value?.scrollIntoView({
        block: "nearest",
        behavior: reduced ? "instant" : "smooth",
      });
    }
  };
  if (!reduced) {
    keepsakeAnimation = gsap.fromTo(
      keepsakePanel.value,
      {
        autoAlpha: 0,
        rotationX: -70,
        y: -12,
        transformOrigin: "50% 0%",
      },
      {
        autoAlpha: 1,
        rotationX: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "opacity,visibility,transform,transformOrigin",
        onComplete: focusKeepsake,
      },
    );
  } else {
    gsap.set(keepsakePanel.value, {
      clearProps: "opacity,visibility,transform,transformOrigin",
    });
    focusKeepsake();
  }
}

function cancelLetterAnimation() {
  letterAnimation?.kill();
  cancelMotifAnimation();
}

function closeLetter() {
  letterOpen.value = false;
  envelopeButton.value?.focus({ preventScroll: true });
}

function animateLetter(el, done, opening) {
  cancelLetterAnimation();
  const flap = envelopeButton.value?.querySelector(".envelope-flap");
  const lines = el.querySelectorAll(".letter-line");
  const finish = () => {
    done();
    gsap.set([el, ...lines], {
      clearProps: "opacity,visibility,transform,transformOrigin",
    });
    if (opening) revealMotifWhenVisible();
  };
  if (!flap) {
    finish();
    return;
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(flap, { rotationX: opening ? 180 : 0 });
    finish();
    return;
  }
  if (opening) prepareMotif();
  // Vue 管理展开状态，Timeline 只编排封口、信纸和正文的显现。
  letterAnimation = gsap.timeline({ onComplete: finish });
  letterAnimation.to(flap, {
    rotationX: opening ? 180 : 0,
    duration: 0.4,
    ease: "power2.inOut",
  });
  if (opening) {
    letterAnimation
      .fromTo(
        el,
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        0.3,
      )
      .fromTo(
        lines,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.14,
          ease: "power2.out",
        },
        0.6,
      );
  } else {
    letterAnimation
      .to(lines, { autoAlpha: 0, duration: 0.18 }, 0)
      .to(
        el,
        {
          rotationX: -85,
          scaleX: 0.78,
          scaleY: 480 / Math.max(el.offsetHeight, 480),
          transformOrigin: "50% 0%",
          duration: 0.55,
          ease: "power2.inOut",
        },
        0.08,
      )
      .to(el, { autoAlpha: 0, duration: 0.12 }, "-=0.12");
  }
}

async function saveKeepsake() {
  if (isSaving.value || !appRef.value) return;
  isSaving.value = true;
  exportStatus.value = "saving";
  // 固定点击时的内容，避免字体加载期间切换语言或祝福影响这次导出。
  const styles = getComputedStyle(appRef.value);
  const snapshot = {
    wish: { ...wishes.value[0] },
    motif: wishMotif.value,
    locale: locale.value,
    title: t("keepsake.title"),
    date: t("hero.date", dateParams.value),
    signature: t("message.signature"),
    greeting: t("footer.subtext"),
    ink: styles.getPropertyValue("--wish-ink").trim(),
    accent: styles.getPropertyValue("--wish-accent").trim(),
  };
  try {
    const texts = [
      snapshot.title,
      snapshot.date,
      snapshot.wish.label,
      snapshot.wish.desc,
      snapshot.signature,
      snapshot.greeting,
    ];
    await document.fonts.load('400 24px "Noto Serif JP"', texts.join(""));
    if (!appRef.value) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1440;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("无法创建纪念卡画布");
    ctx.scale(3, 3);
    ctx.fillStyle = "#fff2df";
    ctx.fillRect(0, 0, 360, 480);
    ctx.strokeStyle = snapshot.ink;
    ctx.lineWidth = 0.8;
    ctx.strokeRect(12, 12, 336, 456);
    ctx.textAlign = "center";
    const write = (text, y, size, color = snapshot.ink) => {
      ctx.fillStyle = color;
      ctx.font = `400 ${size}px "Noto Serif JP", serif`;
      while (ctx.measureText(text).width > 304 && size > 10) {
        ctx.font = `400 ${--size}px "Noto Serif JP", serif`;
      }
      ctx.fillText(text, 180, y);
    };
    write(snapshot.title, 42, 14);
    write(snapshot.date, 68, 11, "#796578");
    ctx.save();
    ctx.translate(24, 100);
    ctx.scale(312 / 360, 312 / 360);
    ctx.strokeStyle = snapshot.ink;
    ctx.fillStyle = snapshot.accent;
    ctx.lineWidth = 1.8;
    ctx.lineCap = ctx.lineJoin = "round";
    snapshot.motif.strokes.forEach(d => ctx.stroke(new Path2D(d)));
    snapshot.motif.accents.forEach(d => {
      const path = new Path2D(d);
      if (snapshot.wish.id !== 2) ctx.fill(path);
      ctx.stroke(path);
    });
    ctx.restore();
    write(snapshot.wish.label, 246, 25);
    snapshot.wish.desc
      .split("\n")
      .forEach((line, i) => write(line, 290 + i * 25, 15, "#3d3040"));
    write(snapshot.signature, 382, 20);
    ctx.beginPath();
    ctx.moveTo(148, 421);
    ctx.lineTo(212, 421);
    ctx.stroke();
    write(snapshot.greeting, 447, 13);
    const link = document.createElement("a");
    link.download = `birthday-wish-${currentYear}-${snapshot.locale}-${snapshot.wish.id}.png`;
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    link.remove();
    exportStatus.value = "saved";
  } catch {
    exportStatus.value = "error";
  } finally {
    isSaving.value = false;
  }
}

let wishFlip;
let isFlipping = false;

async function flipWish() {
  if (!wishSlider.value || wishes.value.length < 2 || isFlipping) return;
  isFlipping = true;
  const state = Flip.getState(wishSlider.value.querySelectorAll(".wish-card"));
  wishIndex.value = (wishIndex.value + 1) % wishes.value.length;
  // 等 Vue 按稳定的 key 重排卡片后，再播放位置变化。
  await nextTick();
  if (!wishSlider.value) return;
  wishFlip = Flip.from(state, {
    targets: wishSlider.value.querySelectorAll(".wish-card"),
    ease: "sine.inOut",
    duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 0.4,
    absolute: true,
    onComplete: () => {
      isFlipping = false;
    },
  });
}

const isMobile = ref(false);
const craneCount = computed(() => (isMobile.value ? 3 : 5));
const fireworksRef = ref(null);
const appRef = ref(null);
let cleanupJourney = () => {};

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

    const select = gsap.utils.selector(appRef.value);
    const motion = gsap.matchMedia();
    motion.add("(prefers-reduced-motion: reduce)", () => {
      letterAnimation?.progress(1);
      keepsakeAnimation?.progress(1);
      cancelMotifAnimation();
    });
    motion.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        let flipCtx;
        let resizeFrame;

        const createJourney = () => {
          flipCtx?.revert();
          flipCtx = gsap.context(() => {
            const middle = Flip.getState(select(".journey-marker--middle"));
            const final = Flip.getState(select(".journey-marker--end"));
            const config = { ease: "none", duration: 1, scale: true };
            const timeline = gsap.timeline({
              scrollTrigger: {
                id: "wish-journey",
                trigger: select(".wishes-section")[0],
                start: "clamp(top center)",
                endTrigger: select(".journey-marker--end")[0],
                end: "clamp(center center)",
                scrub: 1,
              },
            });
            timeline
              .add(Flip.fit(select(".journey-spark")[0], middle, config))
              .add(
                Flip.fit(select(".journey-spark")[0], final, config),
                "+=0.5",
              );
            // 重建时直接恢复当前滚动进度，避免从起点再次追赶。
            timeline.scrollTrigger.refresh();
            timeline.progress(timeline.scrollTrigger.progress);
          }, appRef.value);
        };

        const scheduleJourney = () => {
          cancelAnimationFrame(resizeFrame);
          resizeFrame = requestAnimationFrame(createJourney);
        };
        // 观察实际布局，涵盖语言、字体与响应式尺寸变化；不观察动画的 transform。
        const layoutObserver = new ResizeObserver(scheduleJourney);
        select("section, .birthday-delivery, .footer > .reveal").forEach(el =>
          layoutObserver.observe(el),
        );
        window.addEventListener("resize", scheduleJourney);
        createJourney();

        return () => {
          layoutObserver.disconnect();
          window.removeEventListener("resize", scheduleJourney);
          cancelAnimationFrame(resizeFrame);
          flipCtx?.revert();
        };
      },
      appRef.value,
    );
    cleanupJourney = () => motion.revert();
  });
});

onUnmounted(() => {
  cancelLetterAnimation();
  keepsakeAnimation?.kill();
  wishFlip?.kill();
  cleanupJourney();
  window.removeEventListener("resize", checkMobile);
  ScrollTrigger.getAll().forEach(st => st.kill());
  scrollTriggers = [];
  if (chimeCtx) chimeCtx.close();
});
</script>
