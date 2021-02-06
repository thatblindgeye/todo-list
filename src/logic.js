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

  const removeSingle = (node) => {
    toDo.list[node.dataset.group].splice(node.dataset.index, 1);
    node.remove();
    console.log(toDo.list);
  };

  // pass DOM.selectedGroup.textContent as arguement
  // const removeCompleted = (group) => {
  //   if (DOM.defaultGroups.indexOf(group) >= 0) {
  //     const keyArray = Object.keys(toDo.list);
  //     Object.values(toDo.list).forEach((item, index) => {
  //       for (let i = 0; i < item.length; i++) {
  //         if (item[i].completed === true) {
  //           toDo.list[keyArray[index]].splice(i, 1);
  //         };
  //       };
  //     });
  //   } else {
  //     toDo.list[group].forEach((item) => {
  //       for (let i = 0; i < toDo.list[group].length; i++) {
  //         if (item.completed === true) {
  //           toDo.list[group].splice(i, 1)
  //         };
  //       };
  //     });
  //   };
  // };

  const checkName = (name) => {
    return (
      name.match(/^\s{1,}$/) ||
      name === ""
    );
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
    taskModal.render(e, Object.keys(toDo.list));
    generalModal.onOpen();
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
          remove(e.currentTarget);
          // toDo.saveToLocal();
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
    create,
    update,
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

  // DOM.modalBox.addEventListener("click", (e) => {
  //   const nameInput = document.querySelector("#name-input");
  //   switch (e.target) {
  //     case document.querySelector(".submit-group-btn"):
  //       e.preventDefault();
  //       if (checkName(nameInput.value)) {
  //         alert("Group name cannot be blank and cannot already be taken. Please enter a new name.");
  //         return;
  //       } else {
  //         createGroup(nameInput.value);
  //         // toDo.saveToLocal();
  //         generalModal.onClose();
  //       };
  //       break;
  //     case document.querySelector(".update-group-btn"):
  //       e.preventDefault();
  //       if (checkName(nameInput.value)) {
  //         alert("Group name cannot be blank and cannot already be taken. Please enter a new name.");
  //         return;
  //       } else {
  //         updateGroup(DOM.selectedGroup.textContent, nameInput.value);
  //         // toDo.saveToLocal();
  //         generalModal.onClose();
  //       };
  //       break;
  //     case document.querySelector(".delete-group-btn"):
  //       if (confirm(`This will delete the ${DOM.selectedGroup.textContent} group, along with any tasks within it. Please click "OK" to confirm deletion.`)) {
  //         removeGroup(DOM.selectedGroup.textContent);
  //       // toDo.saveToLocal();
  //       };
  //       generalModal.onClose();
  //       break;
  //     default:
  //       return;
  //   };
  // });
})();

const modalEvents = (() => {
  DOM.modalBox.addEventListener("click", (e) => {
    const nameInput = document.querySelector("#name-input");
    switch (e.target) {
      case document.querySelector(".submit-group-btn"):
        e.preventDefault();
        if (groups.checkName(nameInput.value)) {
          alert("Group name cannot be blank and cannot already be taken. Please enter a new name.");
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
          alert("Group name cannot be blank and cannot already be taken. Please enter a new name.");
          return;
        } else {
          groups.update(DOM.selectedGroup.textContent, nameInput.value);
          // toDo.saveToLocal();
          generalModal.onClose();
        };
        break;
      case document.querySelector(".delete-group-btn"):
        if (confirm(`This will delete the ${DOM.selectedGroup.textContent} group, along with any tasks within it. Please click "OK" to confirm deletion.`)) {
          groups.remove(DOM.selectedGroup.textContent);
        // toDo.saveToLocal();
        };
        generalModal.onClose();
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

export { groups, tasks, toDo };
