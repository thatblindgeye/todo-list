"use strict";

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

const toDo = (() => {
  const masterList = JSON.parse(localStorage.getItem("toDo-list")) || 
    {
      Example: [
        {
          taskName: "Do the dishes",
          completed: false,
          priority: "Normal",
          dueDate: "",
          notes:
            "Let the pans soak, put the plates in the dishwasher, wash the mugs by hand.\n\nWash pans after 30 minutes soaking.",
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

  const saveToLocal = () => {
    localStorage.setItem("toDo-list", JSON.stringify(list));
  };

  window.addEventListener("load", (e) => {
    groupContainer.render(masterList);
    taskContainer.loadGroupTasks(masterList, DOM.activeOnLoad);
  });

  return { 
    masterList,
    saveToLocal
  }
})();

const groups = (() => {
  const _setInactive = () => {
    Array.from(document.getElementsByClassName("group-btn")).forEach(button => {
      button.classList.remove("active");
    });
  };

  const create = (name) => {
    toDo.masterList[name] = [];
    console.log(toDo.masterList);
  };

  const update = (oldName, newName) => {
    delete Object.assign(toDo.masterList, {[newName]: toDo.masterList[oldName]})[oldName];
    console.log(toDo.masterList);
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
    console.log(toDo.masterList);
  };

  const setActive = (target) => {
    target.classList.add("active");
  };

  document.getElementById("main-nav").addEventListener("click", (e) => {
    if (e.target.classList.contains("group-btn")) {
      _setInactive();
      setActive(e.target);
      taskContainer.updateHeader(e.target);
      taskContainer.loadGroupTasks(toDo.masterList, e.target);
    };
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

    if (node.children[1].getAttribute("style") === null) {
      toDo.masterList[groupData][taskIndex].completed = true;
      node.children[1].style.backgroundImage = 
          "url(assets/images/icons/done-black-24dp.svg)";
    } else {
      toDo.masterList[groupData][taskIndex].completed = false;
      node.children[1].removeAttribute("style");
    };
    console.log(toDo.masterList);
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
        // toDo.saveToLocal();
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
          // toDo.saveToLocal();
        };
        break;
      default:
        return;
    };
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
    console.log(toDo.masterList);
  };

  const removeCompleted = (group) => {
    if (DOM.defaultGroups.indexOf(group) >= 0) {
      const keyArray = Object.keys(toDo.masterList);
      Object.values(toDo.masterList).forEach((item, index) => {
        for (let i = (item.length - 1); i >= 0; i--) {
          if (item[i].completed === true) {
            toDo.masterList[keyArray[index]].splice(i, 1);
          };
        };
      });
    } else {
      toDo.masterList[group].forEach((item) => {
        for (let i = (toDo.masterList[group].length - 1); i >= 0 ; i--) {
          if (item.completed === true) {
            toDo.masterList[group].splice(i, 1)
          };
        };
      });
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
    };
  };

  document.querySelector(".add-task-btn").addEventListener("click", (e) => {
    if (Object.keys(toDo.masterList).length === 0) {
      alert("No groups exist. Please create a group before adding a task.");
      return;
    } else {
      taskModal.render(e, Object.keys(toDo.masterList));
      generalModal.onOpen();
    };
  });

  _taskList.addEventListener("click", _resolveTaskEvent);
  _taskList.addEventListener("keydown", (e) => {
    if (e.key === " " && 
        (e.target.classList.contains("task-status") || 
        e.target.classList.contains("task-name"))) {
      e.preventDefault();
      _resolveTaskEvent(e);
    };
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
    const nameInput = document.querySelector("#name-input");
    const group = document.querySelector("#group-select");

    switch (e.target) {
      case document.querySelector(".submit-group-btn"):
      case document.querySelector(".update-group-btn"):
        e.preventDefault();
        if (groups.checkName(nameInput.value)) {
          alert("Group name cannot be blank and cannot already be taken." + 
                "\n\nPlease enter a new name.");
          return;
        } else {
          if (e.target.classList.contains("submit-group-btn")) {
            groups.create(nameInput.value);
            groupContainer.render(toDo.masterList);
            groups.setActive(DOM.activeOnLoad);
            taskContainer.loadGroupTasks(toDo.masterList, DOM.activeOnLoad);
            taskContainer.updateHeader(DOM.activeOnLoad);
          } else {
            groups.update(DOM.taskHeader.textContent, nameInput.value);
            _activeGroup.textContent = nameInput.value;
            taskContainer.updateHeader(_activeGroup);
          };
        };
          // toDo.saveToLocal();
          generalModal.onClose();
        break;
      case document.querySelector(".delete-group-btn"):
        if (confirm(`This will delete the ${DOM.taskHeader.textContent} ` + 
            `group, along with any tasks within it.\n\nPlease click "OK" ` + 
            `to confirm deletion.`)) {
          groups.remove(DOM.taskHeader.textContent);
          // toDo.saveToLocal(); 
          generalModal.onClose();
          groupContainer.render(toDo.masterList);
          groups.setActive(DOM.activeOnLoad);
          taskContainer.loadGroupTasks(toDo.masterList, DOM.activeOnLoad);
          taskContainer.updateHeader(DOM.activeOnLoad);
        };
        break;
      case document.querySelector(".delete-completed-btn"):
        if (tasks.confirmMassRemove()) {
          tasks.removeCompleted(DOM.taskHeader.textContent);
          // toDo.saveToLocal();
          generalModal.onClose();
          taskContainer.loadGroupTasks(toDo.masterList, _activeGroup);
          console.log(toDo.masterList);
        };
        break;
      case document.querySelector(".add-single-btn"):
      case document.querySelector(".add-many-btn"):
        e.preventDefault();
        if (tasks.checkName(nameInput.value)) {
          alert("Task name cannot be blank.\n\nPlease enter a new name.");
          return;
        } else {
          const newTask = tasks.create(
            nameInput.value,
            document.querySelector("#priority-select").value,
            document.querySelector("#date-select").value,
            document.querySelector("#notes-input").value,
            false
          );
          toDo.masterList[group.value].push(newTask);
          // toDo.saveToLocal();
          if (e.target.classList.contains("add-many-btn")) {
            nameInput.focus();
            nameInput.value = "";
            group.selectedIndex = 0;
            document.querySelector("#priority-select").selectedIndex = 0;
            document.querySelector("#date-select").value = "";
            document.querySelector("#notes-input").value = "";
          } else {
            generalModal.onClose();
          };
          taskContainer.loadGroupTasks(toDo.masterList, _activeGroup);
          console.log(toDo.masterList);
        };
        break;
      case document.querySelector(".update-task-btn"):
        e.preventDefault();
        if (tasks.checkName(nameInput.value)) {
          alert("Task name cannot be blank.\n\nPlease enter a new name.");
          return;
        } else {
          tasks.update();
          // toDo.saveToLocal();
          generalModal.onClose();
          taskContainer.loadGroupTasks(toDo.masterList, DOM.taskHeader);
          console.log(toDo.masterList);
        };
        break;
      default:
        return;
    };
  });
})();

export { toDo, groups, tasks, modalEvents };
