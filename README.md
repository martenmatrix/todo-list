# To-Do List
This is an application, where the user can create to-dos, those can be assigned with a priority, date and description. It is also possible to create groups for the to-dos with a description. Additionally, if a user deleted a to-do by accident, it can be reversed by clicking the undo button, which pops up. The app saves the state of the site in the local storage and displays some statistics: to-dos not done and to-dos done.

## Table of Contents
- [Deployed links](#globe_with_meridians-deployed-links)
- [Usage](#grey_exclamation-usage)
- [Features](#sparkles-features)
- [Installation](#wrench-installation)
- [Technology stack](#blue_book-technology-stack)
- [License](#scroll-license)

## :globe_with_meridians: Deployed links
>:warning: Please note that the application does currently not work on mobile screens.

The application is hosted at the following address:

- https://martenmatrix.github.io/todo-list/

## :grey_exclamation: Usage
1. Click the `+` next to `ToDo's` and create a To-Do.
2. If you want to create a group/list, click the `+` next to `Lists`.
3. Select a list by clicking on it, and delete it by clicking on the gray `X`.
4. Delete a To-Do by clicking on the round black circle in its left side.
5. Undo the deletion of a To-Do by clicking on the popup in the top.
6. If something does not work as expected, please [create an issue](https://github.com/martenmatrix/todo-list/issues/new).

## :sparkles: Features
- create to-dos with a name, description, date and priority
- group to-dos in lists
- saves state if you close the site
- delete lists and to-dos
- able to undo the deletion of the last to-do
- display number of to-dos undone and done in total

##  :wrench: Installation

If you want to run the application on your local pc or just want to contribute, do the following steps:

1. Clone the repository.
	`git clone https://github.com/martenmatrix/todo-list`
2. Install the dependencies.
	`npm install`
3. If you want to run the website on your localhost type: 
	`npm run start`

## :blue_book: Technology Stack
- **Webpack** v5.53
- **Babel** v.7.15.5
- **date-fns** v.2.23.0
## :scroll: License
[MIT](https://github.com/martenmatrix/todo-list/blob/main/LICENSE)
