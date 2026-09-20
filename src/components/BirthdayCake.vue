<template>
  <div class="cake-wrapper">
    <div class="cake-glow"></div>
    <div class="cake">
      <div class="candles">
        <div v-for="i in 3" :key="i" class="candle" :class="{ tall: i === 2 }">
          <div class="flame-wrapper"><div class="flame"></div></div>
        </div>
      </div>
      <div class="layer layer-top">
        <div class="drip" style="left: 15px"></div>
        <div class="drip" style="left: 45px"></div>
        <div class="drip" style="left: 80px"></div>
      </div>
      <div class="layer layer-middle">
        <div class="drip" style="left: 10px"></div>
        <div class="drip" style="left: 50px"></div>
        <div class="drip" style="left: 90px"></div>
        <div class="drip" style="left: 125px"></div>
      </div>
      <div class="layer layer-bottom">
        <div class="drip" style="left: 12px"></div>
        <div class="drip" style="left: 55px"></div>
        <div class="drip" style="left: 100px"></div>
        <div class="drip" style="left: 150px"></div>
        <div class="drip" style="left: 180px"></div>
      </div>
      <div class="plate"></div>
    </div>
  </div>
</template>

<style scoped>
.cake-wrapper {
  position: relative;
  width: 280px;
  height: 320px;
  margin-bottom: 50px;
}
.cake-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(240, 194, 127, 0.15) 0%,
    transparent 70%
  );
  border-radius: 50%;
  animation: pulse 3s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.15);
    opacity: 1;
  }
}
.cake {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.plate {
  width: 260px;
  height: 20px;
  background: linear-gradient(180deg, #e8d5b7, #c4a882);
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}
.layer {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
}
.layer-bottom {
  width: 200px;
  height: 80px;
  background: linear-gradient(180deg, #f8e1d0, #f0c9a8);
  bottom: 15px;
  box-shadow: inset 0 -10px 20px rgba(200, 150, 100, 0.3);
}
.layer-bottom::after {
  content: "";
  position: absolute;
  top: -8px;
  left: -5px;
  right: -5px;
  height: 20px;
  background: linear-gradient(180deg, #fff5ee, #fce4d4);
  border-radius: 50%;
}
.layer-middle {
  width: 160px;
  height: 65px;
  background: linear-gradient(180deg, #f5c6d0, #e8a0b0);
  bottom: 95px;
  box-shadow: inset 0 -8px 15px rgba(180, 100, 120, 0.3);
}
.layer-middle::after {
  content: "";
  position: absolute;
  top: -7px;
  left: -4px;
  right: -4px;
  height: 18px;
  background: linear-gradient(180deg, #fff0f3, #f8d4dc);
  border-radius: 50%;
}
.layer-top {
  width: 120px;
  height: 55px;
  background: linear-gradient(180deg, #d4a8d8, #c090c8);
  bottom: 158px;
  box-shadow: inset 0 -6px 12px rgba(150, 80, 160, 0.3);
}
.layer-top::after {
  content: "";
  position: absolute;
  top: -6px;
  left: -3px;
  right: -3px;
  height: 16px;
  background: linear-gradient(180deg, #f0e0f2, #e0c8e4);
  border-radius: 50%;
}
.drip {
  position: absolute;
  width: 12px;
  border-radius: 0 0 6px 6px;
  top: -2px;
}
.layer-bottom .drip {
  background: #fff5ee;
  height: 18px;
}
.layer-middle .drip {
  background: #fff0f3;
  height: 14px;
}
.layer-top .drip {
  background: #f0e0f2;
  height: 12px;
}
.candles {
  position: absolute;
  bottom: 213px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
}
.candle {
  width: 8px;
  height: 40px;
  background: linear-gradient(180deg, #fff5e0, #f0c27f);
  border-radius: 3px;
  position: relative;
}
.candle.tall {
  height: 48px;
}
.flame-wrapper {
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
}
.flame {
  width: 12px;
  height: 20px;
  background: radial-gradient(
    ellipse at 50% 80%,
    #fff 0%,
    #ffe066 30%,
    #ff9500 60%,
    transparent 100%
  );
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: flicker 0.3s ease-in-out infinite alternate;
  position: relative;
}
.flame::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  top: -5px;
  left: -9px;
  background: radial-gradient(
    circle,
    rgba(255, 200, 50, 0.3) 0%,
    transparent 70%
  );
  border-radius: 50%;
}
@keyframes flicker {
  0% {
    transform: scaleY(1) scaleX(1) rotate(-2deg);
  }
  100% {
    transform: scaleY(1.1) scaleX(0.9) rotate(2deg);
  }
}

@media (max-width: 768px) {
  .cake-wrapper {
    transform: scale(0.85);
    margin-bottom: 30px;
  }
}

@media (max-width: 600px) {
  .cake-wrapper {
    transform: scale(0.7);
    margin-bottom: 20px;
  }
}

@media (max-width: 380px) {
  .cake-wrapper {
    transform: scale(0.6);
  }
}
</style>
