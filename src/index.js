"use strict";

import './style.css';
import { accessibilityOptions, displayOptions } from "./site-settings";
import { groupModal, warningModal } from "./modals";
import { groups, modalEvents, tasks, toDo } from "./logic";
import format from 'date-fns/format';

console.log(toDo.list);

const DOM = (() => {
  const menuContainer = document.querySelector("#main-nav");
  const menuOpenButton = document.querySelector(".menu-button");
  const menuCloseButton = document.querySelector(".menu-close-button");
  
  return {
    menuContainer,
    menuOpenButton,
    menuCloseButton
  }
})();

const menuVisibility = (() => {
  const _onScreenSize = () => {
    if (document.documentElement.scrollWidth > 763) {
      DOM.menuContainer.style.visibility = "visible";
      DOM.menuContainer.style.left = "0";
    } else {
      DOM.menuContainer.style.visibility = "hidden";
      DOM.menuContainer.style.left = "-800px";
    };
  };
  
  window.addEventListener("resize", _onScreenSize);
  window.addEventListener("load", _onScreenSize);

  const _toggleMenu = () => {
    if (DOM.menuContainer.style.visibility === "hidden") {
      DOM.menuContainer.style.visibility = "visible";
      DOM.menuContainer.style.left = "0";
      DOM.menuCloseButton.focus();
    } else {
      DOM.menuContainer.style.left = "-800px";
      setTimeout(() => {
        DOM.menuContainer.style.visibility = "hidden"
      }, 600);
      DOM.menuOpenButton.focus();
    };
  };

  DOM.menuOpenButton.addEventListener("click", _toggleMenu);
  DOM.menuCloseButton.addEventListener("click", _toggleMenu);
})();