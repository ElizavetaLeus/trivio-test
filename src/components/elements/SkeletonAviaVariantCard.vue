<template>
  <div :class="$style.root">
    <div>
      <div :class="['skeleton-block', $style.carrierText]"></div>
    </div>
    <div :class="$style.tripContent">
      <div :class="['skeleton-block', $style.dateTime]"></div>
      <div :class="['skeleton-block', $style.roadMap]"></div>
      <div :class="['skeleton-block', $style.dateTime]"></div>
    </div>
    <footer :class="$style.footer">
      <div :class="['skeleton-block', $style.button]"></div>
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
}
.tripContent {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding-bottom: 20px;
  margin-top: 30px;
}
.dateTime {
  --width: 70px;
  --height: 43px;
}
.roadMap {
  --width: 580px;
  --height: 43px;
}
.footer {
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid var(--color-black-10);
}
.carrierText {
  --height: 16px;
  --width: 120px;
}
.button {
  --height: 44px;
  --width: 239px;
  --border-radius: 8px;
}
</style>
