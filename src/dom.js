import { format } from 'date-fns';

const dates

const domManipulation = (function() {
    const listentries = document.querySelector('#list-entries');
    const todosEntries = document.querySelector('#todo-entries');

    //Todo section
    function displayTodoObject(object) {
        const title = object.title;
        const description = object.description;
        const date = object.date;
        const displayDate = format(date, "d'.' MMM'.' y");
        const priority = object.priority;

        const divWrapper = document.createElement('div');
        divWrapper.classList.add('todo-entry');
        divWrapper.dataset.title = title;
        todosEntries.appendChild(divWrapper);

        const centerVerticalDiv = document.createElement('div');
        centerVerticalDiv.classList.add('center-vertical');
        divWrapper.appendChild(centerVerticalDiv);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('circle');
        deleteButton.classList.add('white');
        centerVerticalDiv.appendChild(deleteButton);

        const textItems = document.createElement('div');
        textItems.classList.add('text-items');
        divWrapper.appendChild(textItems);

        const titleParagraph = document.createElement('p');
        titleParagraph.classList.add('title');
        titleParagraph.textContent = title;
        textItems.appendChild(titleParagraph);

        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.classList.add('description');
        descriptionParagraph.textContent = description;
        textItems.appendChild(descriptionParagraph);

        const dateParagraph = document.createElement('p');
        dateParagraph.classList.add('date');
        dateParagraph.textContent = date;
        divWrapper.appendChild(dateParagraph);

        const priorityParagraph = document.createElement('p');
        priorityParagraph.classList.add('priority');
        priorityParagraph.textContent = priority;
        divWrapper.appendChild(priorityParagraph);
    };

    function removeTodoObject() {

    };

    function removeAllTodos() {

    };


    //List sections
    function displayList() {

    };

    function removeList() {

    };

    function removeAllList() {

    };

    //can take an list object as argument and displays everything from it, even the todo entries
    function displayListObject() {

    };


})();