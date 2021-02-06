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
          status: "not completed",
          priority: "Normal",
          due: "",
          notes:
            "Let the pans soak, put the plates in the dishwasher, wash the mugs by hand.\n\nWash pans after 30 minutes soaking.",
        },
        {
          taskName: "Bring Muffin to vet",
          status: "not completed",
          priority: "Important",
          due: "2021-03-05",
          notes: "Pack her favorite toy so she stays calm.",
        },
      ],
    };

  const saveToLocal = () => {
    localStorage.setItem("toDo-list", JSON.stringify(list));
  };

  return { 
    list,
    saveToLocal
  }
})();

const tasks = (() => {
  const create = () => {
    alert("ok");
  };

  const remove = (node) => {
    toDo.list[node.dataset.project].splice(node.dataset.index, 1);
    node.remove();
    console.log(toDo.list);
  };

  const checkName = (name) => {
    return (
      name.match(/^\s{1,}$/) ||
      name === ""
    );
  };

  const updateStatus = (node) => {
    const groupData = node.dataset.project;
    const taskIndex = node.dataset.index;

    if (node.children[1].getAttribute("style") === null) {
      toDo.list[groupData][taskIndex].status = "completed";
      node.children[1].style.backgroundImage = 
          "url(assets/images/icons/done-black-24dp.svg)";
    } else {
      toDo.list[groupData][taskIndex].status = "not completed";
      node.children[1].removeAttribute("style");
    };
    console.log(toDo.list);
  };

  const pullInfo = (node) => {
    const groupData = node.dataset.project;
    const taskIndex = node.dataset.index;

    document.querySelector("#name-input").value = 
        toDo.list[groupData][taskIndex].taskName;
    document.querySelector("#group-select").value = groupData;
    document.querySelector("#priority-select").value = 
        toDo.list[groupData][taskIndex].priority;
    document.querySelector("#date-select").value = 
        toDo.list[groupData][taskIndex].due;
    document.querySelector("#notes-input").value = 
        toDo.list[groupData][taskIndex].notes;
  };

  Array.from(DOM.taskItems).forEach(item => {
    item.addEventListener("click", (e) => {
      switch (e.target) {
        // target is item's checkbox
        case e.currentTarget.children[1]:
          updateStatus(e.currentTarget);
          // toDo.saveToLocal();
          break;
        // target is item's name
        case e.currentTarget.children[2]:
          e.currentTarget.children[4].classList.toggle("expanded");
          break;
        // target is item's edit button
        case e.currentTarget.children[4].children[1]:
          taskModal.render(e);
          pullInfo(e.currentTarget);
          generalModal.onOpen();
          break;
        // target is item's delete button
        case e.currentTarget.children[4].children[2]:
          remove(e.currentTarget);
          // toDo.saveToLocal();
          break;
        default:
          return;
      };
    });
  });
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

  const removeGroup = (name) => {
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

  const setInactive = () => {
    Array.from(DOM.groupButtons).forEach(button => {
      button.classList.remove("active");
    });
  };

  const setActive = (target) => {
    target.classList.add("active");
  };

  Array.from(DOM.groupButtons).forEach(button => {
    button.addEventListener("click", () => {
      setInactive();
      setActive(button);
    });
  });

  DOM.modalBox.addEventListener("click", (e) => {
    const nameInput = document.querySelector("#name-input");
    switch (e.target) {
      case document.querySelector(".submit-group-btn"):
        e.preventDefault();
        if (checkName(nameInput.value)) {
          alert("Group name cannot be blank and cannot already be taken. Please enter a new name.");
          return;
        } else {
          create(nameInput.value);
          toDo.saveToLocal();
          generalModal.onClose();
        };
        break;
      case document.querySelector(".update-group-btn"):
        e.preventDefault();
        if (checkName(nameInput.value)) {
          alert("Group name cannot be blank and cannot already be taken. Please enter a new name.");
          return;
        } else {
          update(DOM.selectedGroup.textContent, nameInput.value);
          toDo.saveToLocal();
          generalModal.onClose();
        };
        break;
      case document.querySelector(".delete-group-btn"):
        removeGroup(DOM.selectedGroup.textContent);
        toDo.saveToLocal();
        generalModal.onClose();
      case document.querySelector(".delete-completed-btn"):
        alert("test");
        toDo.saveToLocal();
        generalModal.onClose();
      default:
        return;
    };
  });
})();

// const buttonListeners = (() => {

// })();

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

export { groups, tasks, toDo };
