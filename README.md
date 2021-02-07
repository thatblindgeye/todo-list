# Will-Do

## Description
A to-do list app that helps ensure that you "Will-Do" any task you need to get done.

## Features
1. Dark and light themes
2. Accessibility options
3. Responsive for mobile or desktop use

## Will-Do How-To
### Display & Accessibility Menu
At the top of the page is a menu for display and accessibility options. Included are:
1. a skip link to skip over the group menu and jump right to the task list.
2. a theme toggle to turn the Light theme on or off.
3. an animation toggle to turn animations on or off. Note: there is a warning popup when the page first loads on your first visit, giving you the chance to disable animations before any occur.

### Default Groups
The first four groups listed in the group menu are the "default groups". Their names cannot be edited, they cannot be deleted, and tasks cannot be manually added to them.

Instead, these default groups filter through all of your tasks and display them based on the criteria of the group:

1. Important - displays tasks that have been marked with a priority of "Important". This is the default view when the page first loads, letting you know of the most important tasks immediately.
2. Next 7 Days - displays tasks that have a due date within 7 days from the current date.
3. Later - displays tasks that have a due date later than 7 days from the current date.
4. Eventually - displays tasks that have no scheduled due date.

### Add Custom Groups
Want to create a list of chores you need to get done? Click the "ADD GROUP" button, enter a group name, then "ADD GROUP". Adding your own custom group is that easy.

By default, your task manager has a group named "Example" already added to it, with example tasks placed within it. This group can be deleted or edited.

### Edit Groups
By clicking the meatball menu next to the group name in the task list area, you can access the group options. The group options vary depending on whether you are viewing a default or custom group.

When viewing a default group, the only option available is to delete all completed tasks that are currently listed. All other options will be visible, but disabled.

When viewing a custom group, the previously disabled options become enabled. You can update the name of the group or completely delete the group. Note: deleting a group completely deletes it and any tasks currently in it, and this cannot be undone.

### Add Tasks
Once you have a custom group setup, you're able to add tasks to it. Click the "ADD TASK" button and fill out the information in the form that pops up.

The name, group, and priority fields are all required. If your task has a specific date that it needs to be completed by or on, enter a due date. If the due date is left blank, the task will simply appear with "no due date" listed.

Keep your task names short, and add all the little details in the notes section. Whether you want to list out groceries you need to buy, or what kind of flowers to buy, you won't forget any details, small or large.

If you have a recurring task, such as doctor or vet visits, bills to pay, etc., then you can add tasks with the same name multiple times. No "Pay bills 1", "Pay bills 2", "Pay bills 3"... Just keep submitting "Pay bills" as the task name and each instance gets stored as a unique task.

### Edit Tasks
Editing a task works the same as adding one, with the exception being that currently you are unable to change the group for a task. 

### View Tasks
The default view for tasks within a group only shows the priority (signified by an exclamation point icon), a checkbox for toggling whether the task is complete or not, the task name, and the due date.

If you click the task name, you can expand the task to view any notes and gain access to the edit and delete buttons.

## Issues During Creation
1. Adding options for accessibility quickly showed how in-depth the task is. I had to look up how various aria attributes functioned in terms of when the element is read by a screen-reader, but there is a lot more to the process than I would have originally thought.
2. Setting up modules for webpack became a little more difficult than the previous project, as I decided to try separating logic a bit more. As of this writing, I am still trying to decide how to separate modules and when/where to import or export to/from.
3. Having the various modals be built dynamically I felt created a hole for myself at times, as I ended up feeling forced to utilize event delegation more than I originally planned. In situations where I didn't want to couple things too tightly (keeping the function that pulls task info separate from the function that renders the "edit task" modal), I was able to overcome this by creating a parameter for a function and pass the necessary argument in, even across modules.