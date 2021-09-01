import { format } from 'date-fns';

const domManipulation = (function() {
    const listentries = document.querySelector('#list-entries');
    const todosEntries = document.querySelector('#todo-entries');

    //misc
    function _removeAllDivs(divs) {
        divs.forEach((div) => {div.remove();})
    };

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
        dateParagraph.textContent = displayDate;
        divWrapper.appendChild(dateParagraph);

        const priorityParagraph = document.createElement('p');
        priorityParagraph.classList.add('priority');
        priorityParagraph.textContent = priority;
        divWrapper.appendChild(priorityParagraph);
    };

    function displayAllTodos(itemsArray) {
        itemsArray.forEach(todo => {displayTodoObject(todo);});
    }

    function removeTodoObject(title) {
        const objectToRemove = document.querySelector(```[data-title="${title}"]```);
        objectToRemove.remove();
    };

    function removeAllTodos() {
        const todoDivs = document.querySelectorAll('.todo-entry');
        _removeAllDivs(todoDivs);
    };

    //List sections
    function displayListObject(listObject) {
        const title = listObject.title;
        const description = listObject.title;

        const divWrapper = document.createElement('div');
        divWrapper.classList.add('list-entry');
        divWrapper.dataset.title = title;
        listentries.appendChild(divWrapper);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '+';
        divWrapper.appendChild(deleteButton);

        const titleParagraph = document.createElement('p');
        titleParagraph.classList.add('title');
        titleParagraph.textContent = title;
        divWrapper.appendChild(titleParagraph);
        
        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.classList.add('description');
        descriptionParagraph.textContent = description;
        divWrapper.appendChild(descriptionParagraph);
    };

    function removeList(title) {
        const listToRemove = document.querySelector(```[data-title="${title}"]```);
        listToRemove.remove();
    };

    function removeAllLists() {
        const listDivs = document.querySelectorAll('.list-entry');
        _removeAllDivs(listDivs);
    };

    function displayLists(listsArray) {
        removeAllLists();

        listsArray.forEach(listObject => {
            displayListObject(listObject);
        });
    };

    return {displayLists, removeAllTodos, displayAllTodos};
})();

export default domManipulation;