"use strict";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import differenceInDays from "date-fns/differenceInDays";
import isToday from "date-fns/isToday";
import {generalModal, taskModal} from "./modals";

const DOM = (() => {
  const defaultGroups = ["Important", "Next 7 Days", "Later", "Eventually"];
  const groupButtons = document.getElementsByClassName("group-btn");
  const modalBox = document.querySelector(".modal-box");
  const selectedGroup = document.querySelector(".selected-group");
  const taskItems = document.getElementsByClassName("task-item");

  return {
    defaultGroups,
    groupButtons,
    modalBox,
    selectedGroup,
    taskItems
  }
})();

const toDo = (() => {
  const list = JSON.parse(localStorage.getItem("toDo-list")) || 
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

  // window.addEventListener("load", (e) => {
  //   taskContainer.render(e);
  //   groupContainer.render();
  // });

  return { 
    list,
    saveToLocal
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

    toDo.list[groupRef][taskRef].taskName = 
        document.querySelector("#name-input").value;
    toDo.list[groupRef][taskRef].priority = 
        document.querySelector("#priority-select").value;
    toDo.list[groupRef][taskRef].dueDate = 
        document.querySelector("#date-select").value;
    toDo.list[groupRef][taskRef].notes = 
        document.querySelector("#notes-input").value;
  };

  const checkName = (name) => {
    return (
      name.match(/^\s{1,}$/) ||
      name === ""
    );
  };

  const removeSingle = (node) => {
    toDo.list[node.dataset.group].splice(node.dataset.index, 1);
    node.remove();
    console.log(toDo.list);
  };

  const removeCompleted = (group) => {
    if (DOM.defaultGroups.indexOf(group) >= 0) {
      const keyArray = Object.keys(toDo.list);
      Object.values(toDo.list).forEach((item, index) => {
        for (let i = (item.length - 1); i >= 0; i--) {
          if (item[i].completed === true) {
            toDo.list[keyArray[index]].splice(i, 1);
          };
        };
      });
    } else {
      toDo.list[group].forEach((item) => {
        for (let i = (toDo.list[group].length - 1); i >= 0 ; i--) {
          if (item.completed === true) {
            toDo.list[group].splice(i, 1)
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
      toDo.list[groupData][taskIndex].completed = true;
      node.children[1].style.backgroundImage = 
          "url(assets/images/icons/done-black-24dp.svg)";
    } else {
      toDo.list[groupData][taskIndex].completed = false;
      node.children[1].removeAttribute("style");
    };
    console.log(toDo.list);
  };

  const _getInfo = (node) => {
    const groupData = node.dataset.group;
    const taskIndex = node.dataset.index;
    // store reference to group and index of task being updated
    DOM.modalBox.setAttribute("data-index-ref", taskIndex);
    DOM.modalBox.setAttribute("data-group-ref", groupData);

    document.querySelector("#name-input").value = 
        toDo.list[groupData][taskIndex].taskName;
    document.querySelector("#group-select").value = groupData;
    document.querySelector("#priority-select").value = 
        toDo.list[groupData][taskIndex].priority;
    document.querySelector("#date-select").value = 
        toDo.list[groupData][taskIndex].dueDate;
    document.querySelector("#notes-input").value = 
        toDo.list[groupData][taskIndex].notes;
  };



  document.querySelector(".add-task-btn").addEventListener("click", (e) => {
    if (Object.keys(toDo.list).length === 0) {
      alert("No group exists to add tasks to.\n\nPlease create a group before adding a task.");
      return;
    } else {
      taskModal.render(e, Object.keys(toDo.list));
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
          taskModal.render(e, Object.keys(toDo.list));
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
    item.addEventListener("keyup", (e) => {
      if (e.key === " " && e.target === e.currentTarget.children[1]) {
        _changeStatus(e.currentTarget);
        // toDo.saveToLocal();
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

const groups = (() => {
  const create = (name) => {
    toDo.list[name] = [];
    console.log(toDo.list);
  };

  const update = (oldName, newName) => {
    delete Object.assign(toDo.list, {[newName]: toDo.list[oldName]})[oldName];
    console.log(toDo.list);
  };

  const remove = (name) => {
    delete toDo.list[name];
    console.log(toDo.list);
  };

  const checkName = (name) => {
    return (
      DOM.defaultGroups.indexOf(name) >= 0 ||
      Object.keys(toDo.list).indexOf(name) >= 0 ||
      name.match(/^\s{1,}$/) ||
      name === ""
    );
  };

  const _setInactive = () => {
    Array.from(DOM.groupButtons).forEach(button => {
      button.classList.remove("active");
    });
  };

  const _setActive = (target) => {
    target.classList.add("active");
  };

  Array.from(DOM.groupButtons).forEach(button => {
    button.addEventListener("click", () => {
      _setInactive();
      _setActive(button);
    });
  });

  return {
    create,
    update,
    remove,
    checkName
  }
})();

const modalEvents = (() => {
  DOM.modalBox.addEventListener("click", (e) => {
    const nameInput = document.querySelector("#name-input");

    switch (e.target) {
      case document.querySelector(".submit-group-btn"):
        e.preventDefault();
        if (groups.checkName(nameInput.value)) {
          alert("Group name cannot be blank and cannot already be taken.\n\nPlease enter a new name.");
          return;
        } else {
          groups.create(nameInput.value);
          // toDo.saveToLocal();
          generalModal.onClose();
        };
        break;
      case document.querySelector(".update-group-btn"):
        e.preventDefault();
        if (groups.checkName(nameInput.value)) {
          alert("Group name cannot be blank and cannot already be taken.\n\nPlease enter a new name.");
          return;
        } else {
          groups.update(DOM.selectedGroup.textContent, nameInput.value);
          // toDo.saveToLocal();
          generalModal.onClose();
        };
        break;
      case document.querySelector(".delete-group-btn"):
        if (confirm(`This will delete the ${DOM.selectedGroup.textContent} group, along with any tasks within it.\n\nPlease click "OK" to confirm deletion.`)) {
          groups.remove(DOM.selectedGroup.textContent);
          // toDo.saveToLocal();
          generalModal.onClose();
        };
        break;
      case document.querySelector(".delete-completed-btn"):
        if (tasks.confirmMassRemove()) {
          tasks.removeCompleted(DOM.selectedGroup.textContent);
          // toDo.saveToLocal();
          generalModal.onClose();
          console.log(toDo.list);
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
          toDo.list[group.value].push(newTask);
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
          console.log(toDo.list);
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
          console.log(toDo.list);
        };
        break;
      default:
        return;
    };
  });
})();

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

export { groups, modalEvents, tasks, toDo };
