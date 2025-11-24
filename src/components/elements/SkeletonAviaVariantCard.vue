<template>
  <div :class="$style.root">
    <div :class="$style.carrier">
      <div :class="[$style.skeletonShimmer, $style.carrierText]"></div>
    </div>
    <div :class="$style.tripContent">
      <div :class="[$style.dateTime, $style.skeletonShimmer]"></div>
      <div :class="[$style.roadMap, $style.skeletonShimmer]"></div>
      <div :class="[$style.dateTime, $style.skeletonShimmer]"></div>
    </div>
    <footer :class="$style.footer">
      <div :class="[$style.skeletonShimmer, $style.button]"></div>
    </footer>
  </div>
</template>

<style module>
.root {
  background-color: var(--color-white);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.carrier {
  margin-bottom: 15px;
}
.tripContent {
  display: flex;
  gap: 40px;
  padding-bottom: 20px;
  padding-top: 15px;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-black-10);
}
.dateTime {
  width: 70px;
  height: 43px;
}

.roadMap {
  max-width: 580px;
  width: 100%;
}
.footer {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.skeletonShimmer {
  background: var(--color-white-smoke);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}
.skeletonShimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, var(--color-gray-bright), transparent);
  animation: shimmer 1.2s infinite;
}
.carrierText {
  height: 16px;
  width: 120px;
}
.button {
  height: 44px;
  width: 239px;
  border-radius: 8px;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}
</style>
