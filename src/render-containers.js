"use strict";

import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { de } from "date-fns/locale";

const groupContainer = (() => {
  const _customGroups = document.querySelector(".custom-groups-container");

  const _clear = () => {
    while (_customGroups.firstChild) {
      _customGroups.removeChild(_customGroups.firstChild);
    };
  };

  const render = (list) => {
    _clear();
    Object.keys(list).forEach(group => {
      const groupItem = document.createElement("li");
      groupItem.setAttribute("tabindex", "0");
      groupItem.setAttribute("aria-label", `Group name: ${group}`);
      groupItem.classList.add("custom-group", "focusable", "group-item");
      groupItem.textContent = group;
      _customGroups.appendChild(groupItem);
    });
  };

  return {render}
})();

const taskContainer = (() => {
  const _taskHeader = document.querySelector(".selected-group");
  const _taskList = document.querySelector(".task-container");

  const _clear = () => {
    while (_taskList.firstChild) {
      _taskList.removeChild(_taskList.firstChild);
    };
  };

  const _checkDate = (date) => {
    const now = new Date();
    const newDate = new Date((date).split("-").join(", "));
    return differenceInCalendarDays(newDate, now);
  };

  const _formattedDate = (date) => {
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
      case differenceInCalendarDays(newDate, now) <= 29:
        return differenceInCalendarDays(newDate, now) + " days";
        break;
      default:
        return formatDistanceToNowStrict(newDate);
        break;
    };
  };

  const _render = (task, group, index) => {
    const taskItem = document.createElement("section");
    taskItem.setAttribute("data-group", group);
    taskItem.setAttribute("data-index", index);
    taskItem.className = "task-item";

    const priorityBox = document.createElement("span");
    // priorityBox.setAttribute("aria-label", `${task.priority} task`);
    priorityBox.className = "task-priority"
    if (task.priority === "Important") {
      const icon = document.createElement("span");
      icon.className = "material-icons";
      icon.textContent = "priority_high";
      icon.setAttribute("aria-label", `${task.priority} task`);
      priorityBox.appendChild(icon);
    };

    const statusBox = document.createElement("span");
    statusBox.setAttribute("role", "checkbox");
    statusBox.setAttribute("aria-checked", "false");
    statusBox.setAttribute("tabindex", "0");
    statusBox.setAttribute("aria-label", `Task: ${task.taskName}. Priority: ${task.priority}`);
    statusBox.classList.add("task-status", "focusable");
    if (task.completed) {
      statusBox.style.backgroundImage = 
      "url(assets/images/icons/done-black-24dp.svg)";
    };

    const nameField = document.createElement("span");
    nameField.setAttribute("role", "button");
    nameField.setAttribute("tabindex", "0");
    nameField.setAttribute("aria-label", `Details for ${task.taskName}`);
    nameField.classList.add("task-name", "focusable");
    nameField.textContent = task.taskName;

    const dateField = document.createElement("span");
    dateField.setAttribute("aria-label", 
        `Due date for task ${task.taskName}: ${task.dueDate}`);
    dateField.className = "task-date";
    dateField.textContent = _formattedDate(task.dueDate);

    const details = document.createElement("div");
    details.setAttribute("data-task", task.taskName);
    details.setAttribute("data-group", group);
    details.setAttribute("data-index", index);
    details.className = "task-details";

    const notesField = document.createElement("p");
    const notesArray = task.notes.split("\n");
    notesField.className = "task-notes";
    for (let i = 0; i < notesArray.length; i++) {
      const text = document.createTextNode(notesArray[i])
      notesField.appendChild(text);
      notesField.appendChild(document.createElement("br"));
    };

    const editBtn = document.createElement("button");
    editBtn.setAttribute("type", "button");
    editBtn.setAttribute("aria-label", `Edit task ${task.taskName}`);
    editBtn.classList.add("edit-btn", "focusable");
    editBtn.textContent = "EDIT";

    const deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.setAttribute("aria-label", `Delete task ${task.taskName}`);
    deleteBtn.classList.add("delete-btn", "focusable");
    deleteBtn.textContent = "DELETE";

    details.appendChild(notesField);
    details.appendChild(editBtn);
    details.appendChild(deleteBtn);
    taskItem.appendChild(priorityBox);
    taskItem.appendChild(statusBox);
    taskItem.appendChild(nameField);
    taskItem.appendChild(dateField);
    taskItem.appendChild(details);
    _taskList.appendChild(taskItem);
  };

  const loadGroupTasks = (list, target) => {
    const keyArray = Object.keys(list);
    _clear();
    switch (target) {
      case document.getElementById("important"):
        Object.values(list).forEach((item, index) => {
          for (let i = 0; i < item.length; i++) {
            if (item[i].priority === "Important") {
              _render(item[i], keyArray[index], i);
            };
          };
        });
        break;
      case document.getElementById("next-7-days"):
        Object.values(list).forEach((item, index) => {
          for (let i = 0; i < item.length; i++) {
            if (_checkDate(item[i].dueDate) <= 7) {
              _render(item[i], keyArray[index], i);
            };
          };
        });
        break;
      case document.getElementById("later"):
        Object.values(list).forEach((item, index) => {
          for (let i = 0; i < item.length; i++) {
            if (_checkDate(item[i].dueDate) > 7) {
              _render(item[i], keyArray[index], i);
            };
          };
        });
        break;
      case document.getElementById("eventually"):
        Object.values(list).forEach((item, index) => {
          for (let i = 0; i < item.length; i++) {
            if (item[i].dueDate === "") {
              _render(item[i], keyArray[index], i);
            };
          };
        });
        break;
      default:
        list[target.textContent].forEach((item, index) => {
          _render(item, target.textContent, index);
        });
        break;
    };
    if (_taskList.children.length === 0) {
      const h2 = document.createElement("h2");
      h2.textContent = "Will-done! No tasks currently exist for this group.";
      _taskList.appendChild(h2);
    };
  };

  const updateHeader = (target) => {
    _taskHeader.textContent = target.textContent;
    document.querySelector(".group-option-btn").setAttribute("aria-label", 
        `View options for group: ${target.textContent}`);
  };

  return {
    loadGroupTasks,
    updateHeader
  }
})();

export { groupContainer, taskContainer }