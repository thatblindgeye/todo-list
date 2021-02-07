"use strict";

import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

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
  const render = (list) => {
    _clear();
    Object.keys(list).forEach(group => {
      const button = document.createElement("button");
      button.setAttribute("type", "button");
      button.setAttribute("aria-label", `Group name: ${group}`);
      button.classList.add("custom-group", "focusable", "group-btn");
      button.textContent = group;
      DOM.customGroups.appendChild(button);
    });
  };

  const _clear = () => {
    while (DOM.customGroups.firstChild) {
      DOM.customGroups.removeChild(DOM.customGroups.firstChild);
    };
  };

  return {render}
})();

const taskContainer = (() => {
  const render = 
    ({taskName, completed, priority, dueDate, notes}, group, index) => {
      const item = document.createElement("section");
      item.setAttribute("data-group", group);
      item.setAttribute("data-index", index);
      item.className = "task-item";

      const priorityBox = document.createElement("span");
      priorityBox.setAttribute("aria-label", `${priority} task`);
      priorityBox.className = "task-priority"
      if (priority === "Important") {
        const icon = document.createElement("span");
        icon.className = "material-icons";
        icon.textContent = "priority_high";
        priorityBox.appendChild(icon);
      };

      const statusBox = document.createElement("span");
      statusBox.setAttribute("role", "checkbox");
      statusBox.setAttribute("aria-checked", "false");
      statusBox.setAttribute("tabindex", "0");
      statusBox.setAttribute("aria-label", taskName);
      statusBox.classList.add("task-status", "focusable");
      if (completed) {
        statusBox.style.backgroundImage = 
        "url(assets/images/icons/done-black-24dp.svg)";
      };

      const nameField = document.createElement("span");
      nameField.setAttribute("role", "button");
      nameField.setAttribute("tabindex", "0");
      nameField.setAttribute("aria-label", `Details for ${taskName}`);
      nameField.classList.add("task-name", "focusable");
      nameField.textContent = taskName;

      const dateField = document.createElement("span");
      dateField.setAttribute("aria-label", 
          `Due date for task ${taskName}: ${dueDate}`);
      dateField.className = "task-date";

      const details = document.createElement("div");
      details.className = "task-details";

      const notesField = document.createElement("p");
      notesField.className = "task-notes";
      notesField.textContent = notes;

      const editBtn = document.createElement("button");
      editBtn.setAttribute("type", "button");
      editBtn.setAttribute("aria-label", `Edit task ${taskName}`);
      editBtn.textContent = "EDIT";

      const deleteBtn = document.createElement("button");
      deleteBtn.setAttribute("type", "button");
      deleteBtn.setAttribute("aria-label", `Delete task ${taskName}`);
      deleteBtn.textContent = "DELETE";

      details.appendChild(notesField);
      details.appendChild(editBtn);
      details.appendChild(deleteBtn);
      item.appendChild(priorityBox);
      item.appendChild(statusBox);
      item.appendChild(nameField);
      item.appendChild(dateField);
      item.appendChild(details);
    };

  const checkGroup = () => {
    switch (e.target) {
      case document.getElementById("important"):

        break;
    }
  }

  const formattedDate = (date) => {
    const now = new Date();
    const newDate = new Date((date).split("-").join(", "));
  
    switch (true) {
      case date === "":
        return "No due date";
        break;
      case differenceInCalendarDays(newDate, now) < 0:
        return "Due date passed";
        break;
      case differenceInCalendarDays(newDate, now) === 0:
        return "Today";
        break;
      case differenceInCalendarDays(newDate, now) === 1:
        return "Tomorrow";
        break;
      default:
        return formatDistanceToNowStrict(newDate);
        break;
    };
  };

  const updateHeader = (target) => {
    DOM.selectedGroup.textContent = target.textContent;
  };

  return {
    updateHeader
  }
})();

export { groupContainer, taskContainer }