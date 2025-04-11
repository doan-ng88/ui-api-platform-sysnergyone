# Example: Todo List

This example is a simple todo list app. with simple buttons to create a popup to add a todo item.

- this example is not done, it is a work in progress.
- The app is built with FSD.
- This example is not meant to be a real app, but a way to understand how to structure a project with FSD.

## Layers

- Pages
  - `task-list`: a page that displays a list of tasks.
- Widgets:
  - `new-task-modal`: a widget that displays a modal to add a new task.
- Features:
  - `create-task`: a feature that creates a new task.
- Entities:
  - `task`: an entity that represents a task list item.

### Simplified

**This is a simplified explanation of the layers. You don't have to use all of the layers, but their names are important. You can have a page with full of features and widgets but no entitie. That's fine.**

**Remember:**

**- As the level of the layer goes down, the more abstract the layer is. And you can't use Widget inside Feature and down more, Entities should not know about Feature and more**

Entities is a layer that contains business entities which is hold the core logic of the task list (which mean there are no features like add task or delete task).

Features is a layer that contains features which is reused implementations of entire product features, or action that can modified entities, i.e. actions that bring business value to the user.

- in this example, the feature is the `create-task` feature which is used to create a new task that use the `task` entity to create the task and save it to the `task-list` entity.
- in this example, the feature is the `delete-task` feature which is used to delete a new task that use the `task` entity to delete the task and save it to the `task-list` entity.

Widgets is a layer that contains widgets which are large self-contained chunks of functionality or UI, usually delivering an entire use case.

- in this example, the widget is the `new-task-modal` widget which is used to add a new task and use the `create-task` feature to create the task inside the modal.

Pages is a layer that contains pages which are full pages or large parts of a page in nested routing.

- in this example, the page is the `task-list` page which is the main page of the app and display the list of tasks.
