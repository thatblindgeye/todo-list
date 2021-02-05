import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const toDo = (() => {
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
})();