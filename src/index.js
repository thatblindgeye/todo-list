"use strict";

import './style.css';
import {DOM, siteStorage, displayOptions, accessibilityOptions} from "./site-settings";

const menu = (() => {
  const menuOpen = document.querySelector(".menu-button");
  const menuClose = document.querySelector(".menu-close-button");
  
  menuOpen.addEventListener("click", () => {
    DOM.menu.style.visibility = "visible";
    DOM.menu.style.left = "0";
    document.querySelector(".menu-close-button").focus();
  });
  
  menuClose.addEventListener("click", () => {
    DOM.menu.style.left = "-800px";
    setTimeout(() => {
      DOM.menu.style.visibility = "hidden"
    }, 600);
    menuOpen.focus();
  });

  window.addEventListener("resize", () => {
    if (document.documentElement.scrollWidth > 767) {
      DOM.menu.style.visibility = "visible";
      DOM.menu.style.left = "0";
    } else {
      DOM.menu.style.visibility = "hidden";
      DOM.menu.style.left = "-800px";
    }
  });
})();
