import {accessibilityOptions, settings} from "./site-settings";

const DOM = (() => {
  const addGroupBtn = document.querySelector(".add-group-btn");
  const addTaskBtn = document.querySelector(".add-task-btn");
  const defaultGroups = ["Important", "Next 7 Days", "Later", "Eventually"];
  const groupButtons = document.getElementsByClassName("group-btn");
  const groupOptionBtn = document.querySelector(".group-option-btn");
  const modalBox = document.querySelector(".modal-box");
  const modalContainer = document.querySelector(".modal-container");
  const selectedGroup = document.querySelector(".selected-group");
  return {
    addGroupBtn,
    addTaskBtn,
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
    const para1 = document.createElement("p");
    const para2 = document.createElement("p");
    const disableButton = document.createElement("button");
    const enableButton = document.createElement("button");

    heading.textContent = "This site uses minimal animation effects.";

    para1.textContent = "Effects include moving menus and smooth scrolling. If you suffer from a vestibular disorder or otherwise prefer no animations, you can turn them off by clicking the first button below.";
  
    para2.textContent= "You can later change this setting in the Display & Accessibility tab at the top of the page.";
  
    disableButton.setAttribute("type", "button");
    disableButton.classList.add("disable-button", "focusable", "primary-btn");
    disableButton.textContent = "DISABLE ANIMATIONS";
    disableButton.addEventListener("click", _selectOption);
    
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

    const nameLabel = document.createElement("label");
    const nameInput = document.createElement("input");
    const mainBtn = document.createElement("input");

    generalModal.createCloseBtn();

    nameLabel.setAttribute("for", "name-input");
    nameLabel.textContent = "Group Name";
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("required", "true");
    nameInput.setAttribute("id", "name-input");
    nameInput.classList.add("focusable");

    if (e.target.classList.contains("add-group-btn")) {
      legend.textContent = "Add a Group";
      mainBtn.setAttribute("type", "submit");
      mainBtn.setAttribute("value", "ADD GROUP");
      mainBtn.classList.add("submit-group-btn", "primary-btn", "focusable", "submit");
      div.appendChild(mainBtn);
    } else if (e.target.classList.contains("group-option-btn")) {
      const deleteGroup = document.createElement("button");
      const deleteCompleted = document.createElement("button");

      legend.textContent = "Group Options";
      mainBtn.setAttribute("type", "submit");
      mainBtn.setAttribute("value", "UPDATE");
      mainBtn.classList.add("update-group-btn", "secondary-btn", "focusable", "submit");

      deleteGroup.setAttribute("type", "button");
      deleteGroup.classList.add("delete-group-btn", "delete-btn", "focusable");
      deleteGroup.textContent = "DELETE GROUP";
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
  const _render = (e) => {
    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    const div = document.createElement("div");

    const nameLabel = document.createElement("label");
    const nameInput = document.createElement("input");

    const groupLabel = document.createElement("label");
    const groupSelect = document.createElement("select");

    const priorityLabel = document.createElement("label");
    const prioritySelect = document.createElement("select");
    const priorityOption1 = document.createElement("option");
    const priorityOption2 = document.createElement("option");

    const dateLabel = document.createElement("label");
    const dateInput = document.createElement("input");
    const notesLabel = document.createElement("label");
    const notesInput = document.createElement("textarea");

    generalModal.createCloseBtn();

    nameLabel.setAttribute("for", "name-input");
    nameLabel.textContent = "Task Name (required)";
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "name-input");
    nameInput.setAttribute("placeholder", "Enter a task name");
    nameInput.setAttribute("required", "true");
    nameInput.className = "focusable";

    groupLabel.setAttribute("for", "group-select");
    groupLabel.textContent = "Group";
    groupSelect.setAttribute("id", "group-select");
    groupSelect.className = "focusable";
    
    priorityLabel.setAttribute("for", "priority-select");
    priorityLabel.textContent = "Priority";
    prioritySelect.setAttribute("id", "priority-select");
    prioritySelect.className = "focusable";
    priorityOption1.textContent = "Normal";
    priorityOption2.textContent = "Important";
    prioritySelect.appendChild(priorityOption1);
    prioritySelect.appendChild(priorityOption2);

    dateLabel.setAttribute("for", "date-select");
    dateLabel.textContent = "Due Date (optional)";
    dateInput.setAttribute("type", "date");
    dateInput.setAttribute("id", "date-select");
    dateInput.className = "focusable";

    notesLabel.setAttribute("for", "notes-input");
    notesLabel.textContent = "Additional Notes";
    notesInput.setAttribute("id", "notes-input");
    notesInput.setAttribute("placeholder", "Enter any additional notes for the task");
    notesInput.className = "focusable";

    if (e.target.textContent.includes("ADD TASK")) {
      const addOneBtn = document.createElement("input");
      const addManyBtn = document.createElement("input");

      legend.textContent = "Add a Task";

      addOneBtn.setAttribute("type", "submit");
      addOneBtn.setAttribute("value", "ADD ONE");
      addOneBtn.setAttribute("aria-label", "Add task and close modal");
      addOneBtn.classList.add("add-single-btn", "primary-btn","submit", "focusable");

      addManyBtn.setAttribute("type", "submit");
      addManyBtn.setAttribute("value", "ADD MANY");
      addManyBtn.setAttribute("aria-label", "Add task and keep modal open");
      addManyBtn.classList.add("add-many-btn", "secondary-btn", "submit", "focusable");

      div.appendChild(addOneBtn);
      div.appendChild(addManyBtn);
    } else if (e.target.textContent === ("EDIT")) {
      const editBtn = document.createElement("input");

      legend.textContent = "Edit Task";

      editBtn.setAttribute("type", "submit");
      editBtn.setAttribute("value", "UPDATE");
      editBtn.setAttribute("aria-label", "Update task and close modal");
      editBtn.classList.add("update-task-btn", "primary-btn", "focusable");
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
    DOM.modalBox.appendChild(form);
  };

  DOM.addTaskBtn.addEventListener("click", (e) => {
    _render(e);
    generalModal.onOpen();
  });
})();

export {generalModal, warningModal, groupModal, taskModal}