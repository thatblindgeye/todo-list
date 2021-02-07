"use strict";

import { generalModal, taskModal } from "./modals";
import { groupContainer, taskContainer } from "./render-containers";

const DOM = (() => {
  const defaultGroups = ["Important", "Next 7 Days", "Later", "Eventually"];
  const nav = document.getElementById("main-nav");
  const groupButtons = document.getElementsByClassName("group-btn");
  const modalBox = document.querySelector(".modal-box");
  const selectedGroup = document.querySelector(".selected-group");
  const taskItems = document.getElementsByClassName("task-item");

  return {
    defaultGroups,
    groupButtons,
    nav,
    modalBox,
    selectedGroup,
    taskItems
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
          dueDate: "2021-03-05",
          notes: "Pack her favorite toy so she stays calm.",
        },
      ],
    };

  const saveToLocal = () => {
    localStorage.setItem("toDo-list", JSON.stringify(list));
  };

  window.addEventListener("load", (e) => {
    // taskContainer.render(e);
    groupContainer.render(masterList);
  });

  return { 
    masterList,
    saveToLocal
  }
})();

const groups = (() => {
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

  const setInactive = () => {
    Array.from(DOM.groupButtons).forEach(button => {
      button.classList.remove("active");
    });
  };

  const setActive = (target) => {
    target.classList.add("active");
  };

  DOM.nav.addEventListener("click", (e) => {
    if (e.target.classList.contains("group-btn")) {
      setInactive();
      setActive(e.target);
      taskContainer.updateHeader(e.target);
    };
  });

  return {
    checkName,
    create,
    update,
    remove,
    setActive,
    setInactive
  }
})();

const tasks = (() => {
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
    if (DOM.defaultGroups.indexOf(DOM.selectedGroup.textContent) >= 0) {
      return confirm(`This will delete all completed tasks in every group.\n\nPlease click "OK" to confirm deletion.`);
    } else {
      return confirm(`This will delete all completed tasks in the ${DOM.selectedGroup.textContent} group.\n\nPlease click "OK" to confirm deletion.`);
    };
  };

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

  const _getInfo = (node) => {
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

  document.querySelector(".add-task-btn").addEventListener("click", (e) => {
    if (Object.keys(toDo.masterList).length === 0) {
      alert("No groups exist. Please create a group before adding a task.");
      return;
    } else {
      taskModal.render(e, Object.keys(toDo.masterList));
      generalModal.onOpen();
    };
  });

  Array.from(DOM.taskItems).forEach(item => {
    item.addEventListener("click", (e) => {
      switch (e.target) {
        // target is item's checkbox
        case e.currentTarget.children[1]:
          _changeStatus(e.currentTarget);
          // toDo.saveToLocal();
          break;
        // target is item's name
        case e.currentTarget.children[2]:
          e.currentTarget.children[4].classList.toggle("expanded");
          break;
        // target is item's edit button
        case e.currentTarget.children[4].children[1]:
          taskModal.render(e, Object.keys(toDo.masterList));
          _getInfo(e.currentTarget);
          generalModal.onOpen();
          break;
        // target is item's delete button
        case e.currentTarget.children[4].children[2]:
          if (confirm(`Please click "OK" to confirm deletion of task "${e.currentTarget.children[2].textContent}".`)) {
            removeSingle(e.currentTarget);
            // toDo.saveToLocal();
          };
          break;
        default:
          return;
      };
    });
  });

  Array.from(DOM.taskItems).forEach(item => {
    item.addEventListener("keydown", (e) => {
      if (e.key === " ") {
        e.preventDefault();
        if (e.target === e.currentTarget.children[1]) {
          _changeStatus(e.currentTarget);
          // toDo.saveToLocal();
        } else if (e.target === e.currentTarget.children[2]) {
          e.currentTarget.children[4].classList.toggle("expanded");
        };
      };
    });
  });

  return {
    confirmMassRemove,
    create,
    update,
    removeCompleted,
    removeSingle,
    checkName
  }
})();

const modalEvents = (() => {
  DOM.modalBox.addEventListener("click", (e) => {
    const nameInput = document.querySelector("#name-input");

    switch (e.target) {
      case document.querySelector(".submit-group-btn"):
      case document.querySelector(".update-group-btn"):
        e.preventDefault();
        if (groups.checkName(nameInput.value)) {
          alert("Group name cannot be blank and cannot already be taken.\n\nPlease enter a new name.");
          return;
        } else {
          if (e.target.classList.contains("submit-group-btn")) {
            groups.create(nameInput.value);
            groupContainer.render(toDo.masterList);
          } else {
            groups.update(DOM.selectedGroup.textContent, nameInput.value);
            document.querySelector(".active").textContent = nameInput.value;
            taskContainer.updateHeader(document.querySelector(".active"));
          };
        };
          // toDo.saveToLocal();
          generalModal.onClose();
        break;
      // case document.querySelector(".update-group-btn"):
      //   e.preventDefault();
      //   if (groups.checkName(nameInput.value)) {
      //     alert("Group name cannot be blank and cannot already be taken.\n\nPlease enter a new name.");
      //     return;
      //   } else {
      //     groups.update(DOM.selectedGroup.textContent, nameInput.value);
      //     // toDo.saveToLocal();
      //     generalModal.onClose();
      //     groupContainer.render(toDo.masterList);
      //   };
      //   break;
      case document.querySelector(".delete-group-btn"):
        if (confirm(`This will delete the ${DOM.selectedGroup.textContent} group, along with any tasks within it.\n\nPlease click "OK" to confirm deletion.`)) {
          groups.remove(DOM.selectedGroup.textContent);
          // toDo.saveToLocal();
          generalModal.onClose();
          groupContainer.render(toDo.masterList);
        };
        break;
      case document.querySelector(".delete-completed-btn"):
        if (tasks.confirmMassRemove()) {
          tasks.removeCompleted(DOM.selectedGroup.textContent);
          // toDo.saveToLocal();
          generalModal.onClose();
          console.log(toDo.masterList);
        };
        break;
      case document.querySelector(".add-single-btn"):
      case document.querySelector(".add-many-btn"):
        const group = document.querySelector("#group-select");
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
            document.querySelector("#priority-select").value = "Normal";
            document.querySelector("#date-select").value = "";
            document.querySelector("#notes-input").value = "";
          } else {
            generalModal.onClose();
          };
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
          console.log(toDo.masterList);
        };
        break;
      default:
        return;
    };
  });
})();

export { groups, modalEvents, tasks, toDo };
