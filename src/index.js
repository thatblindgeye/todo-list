"use strict";

import './style.css';
import {warningModal, displayOptions, accessibilityOptions} from "./site-settings";

const menu = (() => {
  const menu = document.querySelector("#main-nav");
  const menuButton = document.querySelector(".menu-button");
  const closeButton = document.querySelector(".menu-close-button");
  
  const _menuVisibility = () => {
    if (document.documentElement.scrollWidth > 767) {
      menu.style.visibility = "visible";
      menu.style.left = "0";
    } else {
      menu.style.visibility = "hidden";
      menu.style.left = "-800px";
    };
  };

  menuButton.addEventListener("click", () => {
    menu.style.visibility = "visible";
    menu.style.left = "0";
    closeButton.focus();
  });
  
  closeButton.addEventListener("click", () => {
    menu.style.left = "-800px";
    setTimeout(() => {
      menu.style.visibility = "hidden"
    }, 600);
    menuButton.focus();
  });

  window.addEventListener("resize", _menuVisibility);

  window.addEventListener("load", _menuVisibility);
})();


Array.from(document.querySelectorAll(".todo-header label")).forEach(checkbox => {
  checkbox.addEventListener("click", (e) => {
    console.log(document.querySelector(".selected-group").textContent + " " + e.currentTarget.children[1].textContent);
  });
});