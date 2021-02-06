"use strict";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import differenceInDays from "date-fns/differenceInDays";
import isToday from "date-fns/isToday";
import {generalModal} from "./modals";

const DOM = (() => {
  const defaultGroups = ["Important", "Next 7 Days", "Later", "Eventually"];
  const groupButtons = document.getElementsByClassName("group-btn");
  const modalBox = document.querySelector(".modal-box");
  const taskItems = document.getElementsByClassName("task-item");

  return {
    defaultGroups,
    groupButtons,
    modalBox,
    taskItems
  }
})();

const toDo = (() => {
  const list = JSON.parse(localStorage.getItem("toDo-list")) || 
    {
      Example: [
        {
          taskName: "Do the dishes",
          priority: "Normal",
          due: "",
          notes:
            "Let the pans soak, put the plates in the dishwasher, wash the mugs by hand.\n\nWash pans after 30 minutes soaking.",
        },
        {
          taskName: "Bring Muffin to vet",
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

  const toggleComplete = (node) => {
    if (node.getAttribute("style") === null) {
      node.style.backgroundImage = 
          "url(assets/images/icons/done-black-24dp.svg)";
    } else {
      node.removeAttribute("style");
    };
  };

  Array.from(DOM.taskItems).forEach(item => {
    item.addEventListener("click", (e) => {
      switch (e.target) {
        case e.currentTarget.children[1]:
          toggleComplete(e.currentTarget.children[1]);
          // if (e.currentTarget.children[1].getAttribute("style") === null) {
          //   e.currentTarget.children[1].style.backgroundImage = 
          //       "url(assets/images/icons/done-black-24dp.svg)";
          // } else {
          //   e.currentTarget.children[1].removeAttribute("style");
          // };
          break;
        case e.currentTarget.children[2]:
          e.currentTarget.children[4].classList.toggle("expanded");
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
    toDo.saveToLocal();
    console.log(toDo.list);
  };

  const update = (name, newName) => {
    delete Object.assign(toDo.list, { [newName]: toDo.list[name] })[name];
    console.log(toDo.list);
  };

  const remove = (name) => {
    delete toDo.list[name];
  };

  const checkName = (name) => {
    return (
      DOM.defaultGroups.indexOf(name) >= 0 ||
      Object.keys(toDo.list).indexOf(name) >= 0 ||
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
    switch (e.target) {
      case document.querySelector(".submit-group-btn"):
        e.preventDefault();
        if (checkName(document.querySelector("#name-input").value)) {
          alert("Please  a new name.");
          return;
        } else {
          create(document.querySelector("#name-input").value);
          toDo.saveToLocal();
          generalModal.onClose();
        };
        break;
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
