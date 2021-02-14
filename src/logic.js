"use strict";

import { changeState } from "./firebase-logic";
import { generalModal, taskModal } from "./modals";
import { groupContainer, taskContainer } from "./render-containers";


const DOM = (() => {
  const activeOnLoad = document.getElementById("important");
  const defaultGroups = ["Important", "Next 7 Days", "Later", "Eventually"];
  const modalBox = document.querySelector(".modal-box");
  const taskHeader = document.querySelector(".selected-group");
  
  return {
    activeOnLoad,
    defaultGroups,
    modalBox,
    taskHeader
  }
})();

const menuVisibility = (() => {
  const _menuContainer = document.querySelector("#main-nav");
  const _menuOpenButton = document.querySelector(".menu-button");
  const _menuCloseButton = document.querySelector(".menu-close-button");

  const _onScreenSize = () => {
    if (document.documentElement.scrollWidth > 763) {
      _menuContainer.style.visibility = "visible";
      _menuContainer.style.left = "0";
    } else {
      _menuContainer.style.visibility = "hidden";
      _menuContainer.style.left = "-800px";
    }
  };
  
  window.addEventListener("resize", _onScreenSize);
  window.addEventListener("load", _onScreenSize);

  const toggleMenu = (e) => {
    if (_menuContainer.style.visibility === "hidden") {
      _menuContainer.style.visibility = "visible";
      _menuContainer.style.left = "0";
      _menuCloseButton.focus();
    } else {
      _menuContainer.style.left = "-800px";
      setTimeout(() => {
        _menuContainer.style.visibility = "hidden"
      }, 600);
      _menuOpenButton.focus();
    }
  };

  _menuOpenButton.addEventListener("click", toggleMenu);
  _menuCloseButton.addEventListener("click", toggleMenu);

  return {toggleMenu}
})();

const toDo = (() => {
  const masterList = JSON.parse(localStorage.getItem("toDo-list")) || 
    {
      Example: [
        {
          taskName: "Buy groceries",
          completed: false,
          priority: "Normal",
          dueDate: "",
          notes:
            "-Butter\n-Milk\n-Eggs",
        },
        {
          taskName: "Bring Muffin to vet",
          completed: false,
          priority: "Important",
          dueDate: "2021-12-31",
          notes: "Pack her favorite toy so she stays calm.",
        },
      ],
    };

  const saveList = () => {
    localStorage.setItem("toDo-list", JSON.stringify(masterList));
  };

  window.addEventListener("load", (e) => {
    groupContainer.render(masterList);
    taskContainer.loadGroupTasks(masterList, DOM.activeOnLoad);
  });

  return { 
    masterList,
    saveList
  }
})();

const groups = (() => {
  const _setInactive = () => {
    Array.from(document.getElementsByClassName("group-item")).forEach(button => {
      button.classList.remove("active");
    });
  };

  const _clickOnGroup = (e) => {
    _setInactive();
    setActive(e.target);
    taskContainer.updateHeader(e.target);
    taskContainer.loadGroupTasks(toDo.masterList, e.target);
    if (document.documentElement.scrollWidth <= 763) {
      menuVisibility.toggleMenu();
    }
  };

  const create = (name) => {
    toDo.masterList[name] = [];
  };

  const update = (oldName, newName) => {
    delete Object.assign(toDo.masterList, 
                        {[newName]: toDo.masterList[oldName]})[oldName];
  };

  const checkName = (name) => {
    return (
      DOM.defaultGroups.indexOf(name) >= 0 ||
      Object.keys(toDo.masterList).indexOf(name) >= 0 ||
      name.match(/^\s{1,}$/) ||
      name === ""
    );
  };

  const remove = (name) => {
    delete toDo.masterList[name];
  };

  const setActive = (target) => {
    target.classList.add("active");
  };

  document.getElementById("main-nav").addEventListener("click", (e) => {
    if (e.target.classList.contains("group-item")) {
      _clickOnGroup(e);
    }
  });

  document.getElementById("main-nav").addEventListener("keydown", (e) => {
    if (e.key === " " && e.target.classList.contains("group-item")) {
      e.preventDefault();
      _clickOnGroup(e);
    }
  });

  return {
    create,
    update,
    checkName,
    remove,
    setActive
  }
})();

const tasks = (() => {
  const _taskList = document.querySelector(".task-container");
  
  const _changeStatus = (node) => {
    const groupData = node.dataset.group;
    const taskIndex = node.dataset.index;
    // node.children[1].getAttribute("style") === null
    if (toDo.masterList[groupData][taskIndex].completed === false) {
      toDo.masterList[groupData][taskIndex].completed = true;
      node.children[1].setAttribute("aria-checked", "true");
      node.children[1].style.backgroundImage = 
          "url(assets/images/icons/done-black-24dp.svg)";
    } else {
      toDo.masterList[groupData][taskIndex].completed = false;
      node.children[1].setAttribute("aria-checked", "false");
      node.children[1].removeAttribute("style");
    }
  };

  const _getTaskData = (node) => {
    const groupData = node.dataset.group;
    const taskIndex = node.dataset.index;
    // store reference to group and index of task being updated
    DOM.modalBox.dataset.indexRef = taskIndex;
    DOM.modalBox.dataset.groupRef = groupData;

    document.querySelector("#name-input").value = 
        toDo.masterList[groupData][taskIndex].taskName;
    document.querySelector("#group-select").value = groupData;
    document.querySelector("#priority-select").value = 
        toDo.masterList[groupData][taskIndex].priority;
    document.querySelector("#date-select").value = 
        toDo.masterList[groupData][taskIndex].dueDate;
    document.querySelector("#notes-input").value = 
        toDo.masterList[groupData][taskIndex].notes;
  };

  const _resolveTaskEvent = (e) => {
    switch (true) {
      case e.target.classList.contains("task-status"):
        _changeStatus(e.target.parentElement);
        toDo.saveList();
        break;
      case e.target.classList.contains("task-name"):
        // toggle's task item's details section
        e.target.parentElement.children[4].classList.toggle("expanded");
        break;
      case e.target.classList.contains("edit-btn"):
        taskModal.render(e, Object.keys(toDo.masterList));
        _getTaskData(e.target.parentElement);
        generalModal.onOpen();
        break;
      case e.target.classList.contains("delete-btn"):
        if (confirm(`Please click "OK" to confirm deletion of task 
            "${e.target.parentElement.dataset.task}".`)) {
          removeSingle(e.target.parentElement);
          taskContainer.loadGroupTasks(toDo.masterList, 
                                      document.querySelector(".active"));
          toDo.saveList();
        }
        break;
      default:
        return;
    }
  };

  const create = (taskName, priority, dueDate, notes, completed) => {
    return {
      taskName,
      priority,
      dueDate,
      notes,
      completed
    }
  };

  const update = () => {
    const groupRef = DOM.modalBox.getAttribute("data-group-ref");
    const taskRef = DOM.modalBox.getAttribute("data-index-ref");

    toDo.masterList[groupRef][taskRef].taskName = 
        document.querySelector("#name-input").value;
    toDo.masterList[groupRef][taskRef].priority = 
        document.querySelector("#priority-select").value;
    toDo.masterList[groupRef][taskRef].dueDate = 
        document.querySelector("#date-select").value;
    toDo.masterList[groupRef][taskRef].notes = 
        document.querySelector("#notes-input").value;
  };

  const checkName = (name) => {
    return (
      name.match(/^\s{1,}$/) ||
      name === ""
    );
  };

  const removeSingle = (node) => {
    toDo.masterList[node.dataset.group].splice(node.dataset.index, 1);
    node.remove();
  };

  const removeCompleted = (group) => {
    if (DOM.defaultGroups.indexOf(group) >= 0) {
      const keyArray = Object.keys(toDo.masterList);
      Object.values(toDo.masterList).forEach((item, index) => {
        for (let i = (item.length - 1); i >= 0; i--) {
          if (item[i].completed === true) {
            toDo.masterList[keyArray[index]].splice(i, 1);
          }
        }
      });
    } else {
      for (let i = (toDo.masterList[group].length - 1); i >= 0 ; i--) {
        if (toDo.masterList[group][i].completed === true) {
          toDo.masterList[group].splice(i, 1)
        };
      };
    };
  };

  const confirmMassRemove = () => {
    if (DOM.defaultGroups.indexOf(DOM.taskHeader.textContent) >= 0) {
      return confirm(`This will delete all completed tasks in every group. ` + 
                    `\n\nPlease click "OK" to confirm deletion.`);
    } else {
      return confirm(`This will delete all completed tasks in the ` + 
                    `${DOM.taskHeader.textContent} group.\n\nPlease click ` + 
                    `"OK" to confirm deletion.`);
    }
  };

  document.querySelector(".add-task-btn").addEventListener("click", (e) => {
    if (Object.keys(toDo.masterList).length === 0) {
      alert("No groups exist. Please create a group before adding a task.");
      return;
    } else {
      taskModal.render(e, Object.keys(toDo.masterList));
      generalModal.onOpen();
    }
  });

  _taskList.addEventListener("click", _resolveTaskEvent);
  _taskList.addEventListener("keydown", (e) => {
    if (e.key === " " && 
        (e.target.classList.contains("task-status") || 
        e.target.classList.contains("task-name"))) {
      e.preventDefault();
      _resolveTaskEvent(e);
    }
  });

  return {
    create,
    update,
    checkName,
    removeSingle,
    removeCompleted,
    confirmMassRemove,
  }
})();

const modalEvents = (() => {
  DOM.modalBox.addEventListener("click", (e) => {
    const _activeGroup = document.querySelector(".active");
    const _nameInput = document.querySelector("#name-input");
    const _group = document.querySelector("#group-select");

    switch (e.target) {
      case document.querySelector(".submit-group-btn"):
      case document.querySelector(".update-group-btn"):
        e.preventDefault();
        if (groups.checkName(_nameInput.value)) {
          alert("Group name cannot be blank and cannot already be taken." + 
                "\n\nPlease enter a new name.");
          return;
        } else {
          if (e.target.classList.contains("submit-group-btn")) {
            groups.create(_nameInput.value);
            groupContainer.render(toDo.masterList);
            groups.setActive(DOM.activeOnLoad);
            taskContainer.loadGroupTasks(toDo.masterList, DOM.activeOnLoad);
            taskContainer.updateHeader(DOM.activeOnLoad);
          } else {
            groups.update(DOM.taskHeader.textContent, _nameInput.value);
            _activeGroup.textContent = _nameInput.value;
            taskContainer.updateHeader(_activeGroup);
          }
        }
          toDo.saveList();
          generalModal.onClose();
        break;
      case document.querySelector(".delete-group-btn"):
        if (confirm(`This will delete the ${DOM.taskHeader.textContent} ` + 
            `group, along with any tasks within it.\n\nPlease click "OK" ` + 
            `to confirm deletion.`)) {
          groups.remove(DOM.taskHeader.textContent);
          toDo.saveList(); 
          generalModal.onClose();
          groupContainer.render(toDo.masterList);
          groups.setActive(DOM.activeOnLoad);
          taskContainer.loadGroupTasks(toDo.masterList, DOM.activeOnLoad);
          taskContainer.updateHeader(DOM.activeOnLoad);
        }
        break;
      case document.querySelector(".delete-completed-btn"):
        if (tasks.confirmMassRemove()) {
          tasks.removeCompleted(DOM.taskHeader.textContent);
          toDo.saveList();
          generalModal.onClose();
          taskContainer.loadGroupTasks(toDo.masterList, _activeGroup);
        }
        break;
      case document.querySelector(".add-single-btn"):
      case document.querySelector(".add-many-btn"):
        e.preventDefault();
        if (tasks.checkName(_nameInput.value)) {
          alert("Task name cannot be blank.\n\nPlease enter a new name.");
          return;
        } else {
          const newTask = tasks.create(
            _nameInput.value,
            document.querySelector("#priority-select").value,
            document.querySelector("#date-select").value,
            document.querySelector("#notes-input").value,
            false
          );
          toDo.masterList[_group.value].push(newTask);
          toDo.saveList();
          if (e.target.classList.contains("add-many-btn")) {
            _nameInput.focus();
            _nameInput.value = "";
            _group.selectedIndex = 0;
            document.querySelector("#priority-select").selectedIndex = 0;
            document.querySelector("#date-select").value = "";
            document.querySelector("#notes-input").value = "";
          } else {
            generalModal.onClose();
          }
          taskContainer.loadGroupTasks(toDo.masterList, _activeGroup);
        }
        break;
      case document.querySelector(".update-task-btn"):
        e.preventDefault();
        if (tasks.checkName(_nameInput.value)) {
          alert("Task name cannot be blank.\n\nPlease enter a new name.");
          return;
        } else {
          tasks.update();
          toDo.saveList();
          generalModal.onClose();
          taskContainer.loadGroupTasks(toDo.masterList, _activeGroup);
        }
        break;
      default:
        return;
    }
  });
})();

export { toDo, groups, tasks, modalEvents };
