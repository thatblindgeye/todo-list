"use strict";

import { accessibilityOptions, settings } from "./site-settings";

const DOM = (() => {
  const addGroupBtn = document.querySelector(".add-group-btn");
  const defaultGroups = ["Important", "Next 7 Days", "Later", "Eventually"];
  const groupButtons = document.getElementsByClassName("group-btn");
  const groupOptionBtn = document.querySelector(".group-option-btn");
  const modalBox = document.querySelector(".modal-box");
  const modalContainer = document.querySelector(".modal-container");
  const selectedGroup = document.querySelector(".selected-group");

  return {
    addGroupBtn,
    defaultGroups,
    groupButtons,
    groupOptionBtn,
    modalBox,
    modalContainer,
    selectedGroup
  }
})();

const generalModal = (() => {
  const onClose = () => {
    while (DOM.modalBox.firstChild) {
      DOM.modalBox.removeChild(DOM.modalBox.firstChild)
    };
    DOM.modalContainer.style.display = "none";
    DOM.modalBox.dataset.indexRef = "";
    DOM.modalBox.dataset.groupRef = "";
  };

  const onOpen = () => {
    DOM.modalContainer.style.display = "flex";
    document.querySelector(".modal-close-button").focus();
  };

  const createCloseBtn = () => {
    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("aria-label", "Close modal");
    closeBtn.classList.add("modal-close-button", "close-btn", "focusable");
    closeBtn.addEventListener("click", generalModal.onClose);
    DOM.modalBox.appendChild(closeBtn);
  };

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      onClose();
    };
  });

  return {
    createCloseBtn,
    onClose,
    onOpen
  }
})();

const warningModal = (() => {
  const _selectOption = (e) => {
    if (e.target.classList.contains("disable-button")) {
      accessibilityOptions.animationsDisabled();
    } else if (e.target.classList.contains("enable-button")) {
      accessibilityOptions.animationsEnabled();
    };
    settings.saveToLocal();
    generalModal.onClose();
  };

  const _render = () => {
    const heading = document.createElement("h1");
    heading.textContent = "This site uses minimal animation effects.";

    const para1 = document.createElement("p");
    para1.textContent = "Effects include moving menus and smooth scrolling. If you suffer from a vestibular disorder or otherwise prefer no animations, you can turn them off by clicking the first button below.";

    const para2 = document.createElement("p");
    para2.textContent= "You can later change this setting in the Display & Accessibility tab at the top of the page.";

    const disableButton = document.createElement("button");
    disableButton.setAttribute("type", "button");
    disableButton.classList.add("disable-button", "focusable", "primary-btn");
    disableButton.textContent = "DISABLE ANIMATIONS";
    disableButton.addEventListener("click", _selectOption);

    const enableButton = document.createElement("button");
    enableButton.setAttribute("type", "button");
    enableButton.classList.add("enable-button", "focusable", "secondary-btn");
    enableButton.textContent = "ENABLE ANIMATIONS";
    enableButton.addEventListener("click", _selectOption);

    DOM.modalBox.appendChild(heading);
    DOM.modalBox.appendChild(para1);
    DOM.modalBox.appendChild(para2);
    DOM.modalBox.appendChild(disableButton);
    DOM.modalBox.appendChild(enableButton);

    DOM.modalContainer.style.display = "flex";
  };

  const _onLoad = () => {
    if (localStorage.length === 0) {
      _render();
    };
  };

  window.addEventListener("load", _onLoad);
})();

const groupModal = (() => {
  const _render = (e) => {
    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    const div = document.createElement("div");
    const mainBtn = document.createElement("input");

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name-input");
    nameLabel.textContent = "Group Name";

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("required", "true");
    nameInput.setAttribute("id", "name-input");
    nameInput.setAttribute("autocomplete", "off");
    nameInput.classList.add("focusable");

    if (e.target.classList.contains("add-group-btn")) {
      legend.textContent = "Add a Group";
      mainBtn.setAttribute("type", "submit");
      mainBtn.setAttribute("value", "ADD GROUP");
      mainBtn.classList.add("submit-group-btn", "primary-btn", "focusable", "submit");
      div.appendChild(mainBtn);
    } else if (e.target.classList.contains("group-option-btn")) {
      legend.textContent = "Group Options";
      mainBtn.setAttribute("type", "submit");
      mainBtn.setAttribute("value", "UPDATE");
      mainBtn.classList.add("update-group-btn", "secondary-btn", "focusable", "submit");

      const deleteGroup = document.createElement("button");
      deleteGroup.setAttribute("type", "button");
      deleteGroup.classList.add("delete-group-btn", "delete-btn", "focusable");
      deleteGroup.textContent = "DELETE GROUP";

      const deleteCompleted = document.createElement("button");
      deleteCompleted.setAttribute("type", "button");
      deleteCompleted.classList.add("delete-completed-btn", "delete-btn", "focusable");
      deleteCompleted.textContent = "DELETE COMPLETED TASKS";

      if (DOM.defaultGroups.indexOf(DOM.selectedGroup.textContent) >= 0) {
        nameLabel.style.opacity = "0.38";
        nameInput.setAttribute("disabled", "true");
        nameInput.style.opacity = "0.38";
        mainBtn.setAttribute("disabled", "true");
        mainBtn.style.opacity = "0.38";
        deleteGroup.setAttribute("disabled", "true");
        deleteGroup.style.opacity = "0.38";
      };

      div.appendChild(mainBtn);
      div.appendChild(deleteGroup);
      div.appendChild(deleteCompleted);
    };

    fieldset.appendChild(legend);
    fieldset.appendChild(nameLabel);
    fieldset.appendChild(nameInput);
    fieldset.appendChild(div);
    form.appendChild(fieldset);
    generalModal.createCloseBtn();
    DOM.modalBox.appendChild(form);
  };

  DOM.groupOptionBtn.addEventListener("click", (e) => {
    _render(e);
    generalModal.onOpen();
  });

  DOM.addGroupBtn.addEventListener("click", (e) => {
    _render(e);
    generalModal.onOpen();
  });
})();

const taskModal = (() => {
  const _priorityArray = ["Normal", "Importan"];

  // pass group list from task module pattern in logic.js file as argument
  const render = (e, groupList) => {
    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    const div = document.createElement("div");

    const nameLabel = document.createElement("label");
    nameLabel.setAttribute("for", "name-input");
    nameLabel.textContent = "Task Name (required)";

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "name-input");
    nameInput.setAttribute("placeholder", "Enter a task name");
    nameInput.setAttribute("required", "true");
    nameInput.setAttribute("autocomplete", "off");
    nameInput.className = "focusable";

    const groupLabel = document.createElement("label");
    groupLabel.setAttribute("for", "group-select");
    groupLabel.textContent = "Group";

    const groupSelect = document.createElement("select");
    groupSelect.setAttribute("id", "group-select");
    groupSelect.className = "focusable";
    for (let i = 0; i < groupList.length; i++) {
      const groupOption = document.createElement("option");
      groupOption.setAttribute("value", groupList[i]);
      groupOption.textContent = groupList[i];
      groupSelect.appendChild(groupOption);
    };

    const priorityLabel = document.createElement("label");
    priorityLabel.setAttribute("for", "priority-select");
    priorityLabel.textContent = "Priority";

    const prioritySelect = document.createElement("select");
    prioritySelect.setAttribute("id", "priority-select");
    prioritySelect.className = "focusable";
    for (let i = 0; i < _priorityArray.length; i++) {
      const priorityOption = document.createElement("option");
      priorityOption.setAttribute("value", _priorityArray[i]);
      priorityOption.textContent = _priorityArray[i];
      prioritySelect.appendChild(priorityOption);
    };

    const dateLabel = document.createElement("label");
    dateLabel.setAttribute("for", "date-select");
    dateLabel.textContent = "Due Date (optional)";

    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "date-select");
    dateInput.className = "focusable";

    const notesLabel = document.createElement("label");
    notesLabel.setAttribute("for", "notes-input");
    notesLabel.textContent = "Additional Notes";

    const notesInput = document.createElement("textarea");
    notesInput.setAttribute("id", "notes-input");
    notesInput.setAttribute("placeholder", "Enter any additional notes for the task");
    notesInput.className = "focusable";

    // priorityOption1.textContent = "Normal";
    // priorityOption2.textContent = "Important";
    // prioritySelect.appendChild(priorityOption1);
    // prioritySelect.appendChild(priorityOption2);
    // const priorityOption1 = document.createElement("option");
    // const priorityOption2 = document.createElement("option");

    if (e.target.textContent.includes("ADD TASK")) {
      legend.textContent = "Add a Task";

      const addOneBtn = document.createElement("input");
      addOneBtn.setAttribute("type", "submit");
      addOneBtn.setAttribute("value", "ADD ONE");
      addOneBtn.setAttribute("aria-label", "Add task and close modal");
      addOneBtn.classList.add("add-single-btn", "primary-btn","submit", "focusable");

      const addManyBtn = document.createElement("input");
      addManyBtn.setAttribute("type", "submit");
      addManyBtn.setAttribute("value", "ADD MANY");
      addManyBtn.setAttribute("aria-label", "Add task and keep modal open");
      addManyBtn.classList.add("add-many-btn", "secondary-btn", "submit", "focusable");

      div.appendChild(addOneBtn);
      div.appendChild(addManyBtn);
    } else if (e.target.textContent === ("EDIT")) {
      legend.textContent = "Edit Task";

      const editBtn = document.createElement("input");
      editBtn.setAttribute("type", "submit");
      editBtn.setAttribute("value", "UPDATE");
      editBtn.setAttribute("aria-label", "Update task and close modal");
      editBtn.classList.add("update-task-btn", "primary-btn", "focusable");

      groupSelect.setAttribute("disabled", "true");
      groupLabel.style.opacity = "0.38";
      groupSelect.style.opacity = "0.38";

      div.appendChild(editBtn);
    };

    fieldset.appendChild(legend);
    fieldset.appendChild(nameLabel);
    fieldset.appendChild(nameInput);
    fieldset.appendChild(groupLabel);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(groupSelect);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(priorityLabel);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(prioritySelect);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(dateLabel);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(dateInput);
    fieldset.appendChild(document.createElement("br"));
    fieldset.appendChild(notesLabel);
    fieldset.appendChild(notesInput);
    fieldset.appendChild(div);
    form.appendChild(fieldset);
    generalModal.createCloseBtn();
    DOM.modalBox.appendChild(form);
  };

  return {render}
})();

export { generalModal, groupModal, taskModal, warningModal }