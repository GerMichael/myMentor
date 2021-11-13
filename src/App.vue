<template>
  <div>
    <router-view name="header" />
    <router-view />
    <router-view name="footer" />
  </div>
</template>

<style>
/* Global Styles */
/* From: https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting */

* {
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: proxima-soft;
  font: var(--app-font-xxs-regular);
}

h1 {
  font: var(--app-font-m-bold);
  margin: 25px 0 0;
}

h2 {
  font: var(--app-font-m-bold);
  margin: 25px 0 0;
}

h3 {
  font: var(--app-font-s-regular);
  margin: 15px 0 0;
}

h4 {
  font: var(--app-font-s-bold);
  margin: 15px 0 0;
}

p {
  margin: 16px 0 0;
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

/* Animations */
.fade_cover-enter {
  backdrop-filter: blur(0);
}
.fade_cover-enter-active {
  animation: fadeIn 0.1s ease-in forwards;
  transition: backdrop-filter;
  backdrop-filter: blur(4px);
}
.fade_cover-leave {
  backdrop-filter: blur(4px);
}
.fade_cover-leave-active {
  animation: fadeOut 0.1s ease-in forwards;
  transition: backdrop-filter;
  backdrop-filter: blur(0);
}

.fadeUp-enter-active {
  animation: fadeInUp 0.1s ease-in forwards;
}
.fadeUp-leave-active {
  animation: fadeOutDown 0.1s ease-in forwards;
}

.fadeH-enter-active {
  animation: fadeInLeft 0.1s ease-in forwards;
}

.fadeH-leave-active {
  animation: fadeOut 0.1s ease-in forwards;
}

.error-shake-enter-active {
  animation: shake 1s ease-in forwards;
}
.error-shake-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
  overflow: hidden;
}

.zoomInRight-enter-active {
  animation: zoomInRight 500ms forwards;
  z-index: 100 !important;
}

.zoomInRight-move {
  transition: transform 500ms;
}

.zoomInRight-leave-active {
  animation: zoomOut 500ms forwards;
  position: absolute;
}

.switch-enter-active {
  animation: backInRight 500ms forwards;
}
.switch-leave-active {
  animation: backOutLeft 500ms forwards;
}

.zoomIn-enter-active {
  animation: zoomIn 500ms forwards;
  z-index: 100 !important;
}

.zoomIn-move {
  transition: transform 500ms;
}

.zoomIn-leave-active {
  animation: zoomOut 500ms forwards;
  position: absolute;
}

.slideInDown-enter-active {
  animation: slideInDown 500ms forwards;
}
.slideInDown-move {
  transition: transform 500ms;
}
.slideInDown-leave-active {
  animation: slideOutDown 500ms forwards;
  position: absolute;
}

:root {
  /* Color-Variables */
  /* Greyscale */
  --app-color-black: #222222;
  --app-color-dark-grey: #8a8389;
  --app-color-light-grey: #e0dfe0;
  --app-color-almost-white: #f9f9f9;
  --app-color-white: #ffffff;
  --app-color-white-transparent: rgba(255, 255, 255, 0.8);

  /* Brand */
  --app-color-brand-1: #ef5a39;
  --app-color-brand-2: #64235b;
  --app-color-brand-gradient: linear-gradient(180deg, #ef5a39 0%, #64235b 100%),
    #c4c4c4;

  /* System */
  --app-color-success: #83c72e;
  --app-color-warning: #ee6214;
  --app-color-error: #cf1919;

  /* Font-Variables */
  /* The font property is a shorthand property for:
        - font-style
        - font-variant
        - font-weight
        - font-size/line-height
        - font-family
      font: italic small-caps bold 12px/30px Georgia, serif; */
  /* Bold */
  --app-font-xxl-bold: normal normal 600 55px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xxl-bold: uppercase;
  --app-font-xl-bold: normal normal 600 47px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xl-bold: none;
  --app-font-l-bold: normal normal 600 40px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-l-bold: none;
  --app-font-m-bold: normal normal 600 35px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-m-bold: none;
  --app-font-s-bold: normal normal 600 27px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-s-bold: none;
  --app-font-xs-bold: normal normal 600 22px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xs-bold: none;
  --app-font-xxs-bold: normal normal 600 16px/150% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xxs-bold: none;
  --app-font-xxxs-bold: normal normal 600 14px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xxxs-bold: none;

  /* Regular */
  --app-font-xxl-regular: normal normal normal 55px/140% proxima-soft,
    "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xxl-regular: uppercase;
  --app-font-xl-regular: normal normal normal 47px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xl-regular: none;
  --app-font-l-regular: normal normal normal 40px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-l-regular: none;
  --app-font-m-regular: normal normal normal 35px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-m-regular: none;
  --app-font-s-regular: normal normal normal 27px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-s-regular: none;
  --app-font-xs-regular: normal normal normal 22px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xs-regular: none;
  --app-font-xxs-regular: normal normal normal 16px/150% proxima-soft,
    "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xxs-regular: none;
  --app-font-xxs-regular-underline: normal normal normal 16px/150% proxima-soft,
    "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xxs-regular-underline: none;
  --app-text_decoration-xxs-regular-underline: underline;
  --app-font-xxxs-regular: normal normal normal 14px/140% proxima-soft,
    "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xxxs-regular: none;

  /* Medium */
  --app-font-xs-medium: normal normal 500 22px/140% proxima-soft, "Segoe UI",
    Tahoma, Geneva, Verdana, sans-serif;
  --app-text_transform-xs-medium: none;
}

* {
  padding: 0;
  margin: 0;
}

::-webkit-scrollbar {
  width: 7.5px;
  cursor: default;
}
::-webkit-scrollbar-track {
  background: #fff0;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3.75px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
  border-radius: 3.75px;
}
</style>