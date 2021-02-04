"use strict";

import './style.css';
import {displayOptions, accessibilityOptions} from "./site-settings";
import {warningModal, taskModal} from "./modals";
import {visibility} from "./menu";


document.querySelector(".task-item").addEventListener("keyup", (e) => {
  if (e.key === "Tab") {
    console.log(e.target);
    console.log(e.currentTarget)
  }

})