<template>
  <transition name="fade_cover" appear>
    <!-- Background cover -->
    <div id="cover">
      <transition name="fadeUp" appear>
        <slot />
      </transition>
    </div>
  </transition>
</template>

<style scoped>
#cover {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--app-color-white-transparent);
  backdrop-filter: blur(4px);
}
</style>