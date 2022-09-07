## Welcome to Task Sensei!

Task Sensei is a simple Task Manager that lets you create tasks, set due dates, and organize tasks based on their status (Incomplete, In-Progress, and Complete).

You can use Task Sensei by visiting https://task-sensei.netlify.app/

## Walkthrough

### Creating and Searching for Tasks

Use the input field labeled Task Name just below the header to create new tasks. As you type, Task Sensei will retrieve tasks with similar titles, or even the exact title, if one exists.
You will also receive a helpful message under the Task Name text input field if a task name/title has already been chosen.

### Task Settings and Saving a Task

After entering a name/title for a task, the task will appear on the right-hand side of your screen, allowin you set certain details for the task.
Details you can set include the task due date and status (Incomplete, In-Progress, Complete) of the task. By default, a task's status will be set to incomplete.
Clicking Save will place the task in the Task Grid. Your newly created task will be categorized within one of the three Status Containers.
Conversely, you can click Cancel if you decide you no longer want to create this task. It's cool, we're all free to change our mind.

### Navigating the Task Grid

The task items in the Task Grid are selectable/clickable.
Once clicked, a task item will be highlighted in blue and exhibit a pulsating animation. This makes it easy to know which task you're viewing or would like to edit.
The details of the clicked task item will appear in the Task Pane (right-hand side of screen). You can, again, edit the details of the task.

### Navigating Task Pane (for existing tasks)

You can change the task: title/name, due date by clicking the Edit button. To apply the changes, click the Save Changes button.
You do not have to click Edit to change the status of a task; you can do this at any time within the Task Pane.
When changing the status, the currently active task item will be placed into the Status Container matching the most recently selected status.

## Tasks won't disappear after you leave

Your tasks will remain in-tact, even after you leave Task Sensei or refresh the page.

## That's it!

I hope you enjoy using Task Sensei. New features are planned for the application, and you'll be able to find them in this repository. Thanks for stopping by.

## Under the Hood

Task Sensei is built on top of ReactJS and uses Redux Toolkit for app-wide and component-wide state management.
The application is styled using SASS via SCSS syntax.
