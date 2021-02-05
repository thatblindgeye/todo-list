"use strict";

import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import differenceInDays from 'date-fns/differenceInDays';
import isToday from 'date-fns/isToday';

// const DOM = (() => {

  
// })();

const task = (() => {
  const list = {
    Example: [
      {
        taskName: "Do the dishes",
        priority: "Normal",
        due: "",
        notes: "Let the pans soak, put the plates in the dishwasher, wash the mugs by hand.\n\nWash pans after 30 minutes soaking."
      },
      {
        taskName: "Bring Muffin to vet",
        priority: "Important",
        due: "2021-03-05",
        notes: "Bring favorite toy so she stays calm."
      }
    ]
  };

  return {list}
})();

const group = (() => {
  const create = (name) => {
      task.list[name] = [];
      console.log(task.list);
  };

  const update = (name, newName) => {
    delete Object.assign(task.list, {[newName]: task.list[name]})[name];
    console.log(task.list);
  };

  const remove = (name) => {
    delete task.list[name];
  };

  const checkForGroup = (name, defaultGroups) => {
    return (defaultGroups.indexOf(name) >= 0 || 
            Object.keys(task.list).indexOf(name) >= 0) || 
            name === "";
  };

  return {
    checkForGroup,
    create,
    remove,
    update
  }
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

export {group, task}