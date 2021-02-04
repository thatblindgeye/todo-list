import {accessibilityOptions, settings} from "./site-settings";

const DOM = (() => {
  const addTaskBtn = document.querySelector(".add-task-button");
  const editTaskBtns = document.querySelectorAll(".edit-btn");
  const modalBox = document.querySelector(".modal-box");
  const modalContainer = document.querySelector(".modal-container");

  

  return {
    addTaskBtn,
    editTaskBtns,
    modalBox,
    modalContainer
  }
})();

const modal = (() => {
  const close = () => {
    for (let i = 0; i < DOM.modalBox.children.length; i++) {
      DOM.modalBox.removeChild(DOM.modalBox.lastChild);
    };
    DOM.modalContainer.style.display = "none";
  };

  const createCloseBtn = () => {
    const closeBtn = document.createElement("button");
    closeBtn.setAttribute("type", "button");
    closeBtn.setAttribute("aria-label", "Close modal");
    closeBtn.classList.add("modal-close-button", "close-btn", "focusable");
    closeBtn.addEventListener("click", modal.close);
    DOM.modalBox.appendChild(closeBtn);
  };

  return {
    close,
    createCloseBtn
  }
})();

const warningModal = (() => {
  const render = () => {
    const heading = document.createElement("h1");
    const para1 = document.createElement("p");
    const para2 = document.createElement("p");
    const disableButton = document.createElement("button");
    const continueButton = document.createElement("button");

    heading.textContent = "This site uses minimal animation effects.";

    para1.textContent = "Effects include moving menus and smooth scrolling. If you suffer from a vestibular disorder or otherwise prefer no animations, you can turn them off by clicking the first button below.";
  
    para2.textContent= "You can later change this setting in the Display & Accessibility tab at the top of the page.";
  
    disableButton.setAttribute("type", "button");
    disableButton.classList.add("disable-button", "focusable", "primary-btn");
    disableButton.textContent = "Disable Animations";
    disableButton.addEventListener("click", () => {
      accessibilityOptions.animationsDisabled();
      settings.saveToLocal();
      modal.close();
    });
    
    continueButton.setAttribute("type", "button");
    continueButton.classList.add("continue-button", "focusable", "secondary-btn");
    continueButton.textContent = "Continue with Animations";
    continueButton.addEventListener("click", () => {
      accessibilityOptions.animationsEnabled();
      settings.saveToLocal();
      modal.close();
    });

    DOM.modalBox.appendChild(heading);
    DOM.modalBox.appendChild(para1);
    DOM.modalBox.appendChild(para2);
    DOM.modalBox.appendChild(disableButton);
    DOM.modalBox.appendChild(continueButton);
  };

  const _onLoad = () => {
    if (localStorage.length === 0) {
      DOM.modalContainer.style.display = "flex";
      render();
    };
  };

  window.addEventListener("load", _onLoad);
})();

const projectModal = (() => {
  const renderNew = () => {

  };

  const renderEdit = () => {

  };

  const renderOptions = () => {

  };
})();

const taskModal = (() => {
  const render = (e) => {
    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");

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

    const div = document.createElement("div");

    modal.createCloseBtn();

    nameLabel.setAttribute("for", "name-input");
    nameLabel.textContent = "Task name (required)";
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("id", "name-input");
    nameInput.setAttribute("name", "name-input");
    nameInput.setAttribute("placeholder", "Enter a task name");
    nameInput.setAttribute("required", "true");
    nameInput.className = "focusable";

    groupLabel.setAttribute("for", "group-select");
    groupLabel.textContent = "Group";
    groupSelect.setAttribute("id", "group-select");
    groupSelect.setAttribute("name", "group-select");
    groupSelect.className = "focusable";
    
    priorityLabel.setAttribute("for", "priority-select");
    priorityLabel.textContent = "Priority";
    prioritySelect.setAttribute("id", "priority-select");
    prioritySelect.setAttribute("name", "priority-select");
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

      legend.textContent = "Add a new task";

      addOneBtn.setAttribute("type", "submit");
      addOneBtn.setAttribute("value", "ADD ONE");
      addOneBtn.setAttribute("aria-label", "Add task and close modal");
      addOneBtn.classList.add("add-single-btn", "primary-btn","submit", "focusable");

      addManyBtn.setAttribute("type", "submit");
      addManyBtn.setAttribute("value", "ADD MANY");
      addManyBtn.setAttribute("aria-label", "Add task and keep modal open");
      addManyBtn.classList.add("add-many-btn", "primary-btn", "submit", "focusable");

      div.appendChild(addOneBtn);
      div.appendChild(addManyBtn);
    } else if (e.target.textContent.includes("EDIT")) {
      const editBtn = document.createElement("input");

      legend.textContent = "Edit task";

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
    DOM.modalContainer.style.display = "flex";
    render(e);
    document.querySelector(".modal-close-button").focus();
  });

  // Array.from(DOM.editTaskBtns).forEach(button => {
  //   button.addEventListener("click", (e) => {
  //     DOM.modalContainer.style.display = "flex";
  //     render(e);
  //     document.querySelector(".modal-close-button").focus();
  //   });
  // });
})();

export {warningModal, taskModal}