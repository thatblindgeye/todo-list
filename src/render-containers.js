"use strict";

import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import differenceInDays from "date-fns/differenceInDays";
import isToday from "date-fns/isToday";

const DOM = (() => {
  const customGroups = document.querySelector(".custom-groups-container");
  const selectedGroup = document.querySelector(".selected-group");
  const tasksList = document.querySelector(".task-container");

  return {
    customGroups,
    selectedGroup,
    tasksList
  }
})();

const groupContainer = (() => {
  const render = (source) => {
    clear();
    Object.keys(source).forEach(group => {
      const button = document.createElement("button");
      button.setAttribute("type", "button");
      button.setAttribute("aria-label", `Group name: ${group}`);
      button.classList.add("custom-group", "focusable", "group-btn");
      button.textContent = group;
      DOM.customGroups.appendChild(button);
    });
  };

  const clear = () => {
    while (DOM.customGroups.firstChild) {
      DOM.customGroups.removeChild(DOM.customGroups.firstChild);
    };
  };

  return {render}
})();

export {groupContainer}


// let now = new Date();

// let dueDate = new Date(("2021-02-01").split("-").join(", "));

// if (isToday(dueDate)) {
//   console.log("Today")
// } else if (differenceInDays(dueDate, now) <= 7) {
//   console.log("this week");
//   console.log(differenceInDays(dueDate, now));
// } else if (differenceInDays(dueDate, now) > 7) {
//   console.log(formatDistanceToNowStrict(dueDate));
// } else if (dueDate === "") {
//   console.log("No due date")
// }