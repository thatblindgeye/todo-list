"use strict";

import './style.css';
import { accessibilityOptions, displayOptions } from "./site-settings";
import { groupModal, warningModal } from "./modals";
import { groups, modalEvents, tasks, toDo } from "./logic";
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

console.log(toDo.masterList);

const menuVisibility = (() => {
  const menuContainer = document.querySelector("#main-nav");
  const menuOpenButton = document.querySelector(".menu-button");
  const menuCloseButton = document.querySelector(".menu-close-button");

  const _onScreenSize = () => {
    if (document.documentElement.scrollWidth > 763) {
      menuContainer.style.visibility = "visible";
      menuContainer.style.left = "0";
    } else {
      menuContainer.style.visibility = "hidden";
      menuContainer.style.left = "-800px";
    };
  };
  
  window.addEventListener("resize", _onScreenSize);
  window.addEventListener("load", _onScreenSize);

  const _toggleMenu = () => {
    if (menuContainer.style.visibility === "hidden") {
      menuContainer.style.visibility = "visible";
      menuContainer.style.left = "0";
      menuCloseButton.focus();
    } else {
      menuContainer.style.left = "-800px";
      setTimeout(() => {
        menuContainer.style.visibility = "hidden"
      }, 600);
      menuOpenButton.focus();
    };
  };

  menuOpenButton.addEventListener("click", _toggleMenu);
  menuCloseButton.addEventListener("click", _toggleMenu);
})();

window.addEventListener("click", (e) => {
  e.target.blur();
});