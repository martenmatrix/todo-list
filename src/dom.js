import { format } from 'date-fns';

const domManipulation = (function() {
    const listentries = document.querySelector('#lists-entries');
    const todosEntries = document.querySelector('#todos-entries');

    //misc
    function _removeAllDivs(divs) {
        divs.forEach((div) => {div.remove();})
    };

    //Todo section
    function displayTodoObject(object) {
        const title = object.title;
        const description = object.description;
        const date = new Date(object.date);
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
        const description = listObject.description;

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

    function selectList(listTitle) {
        const allListsDivs = document.querySelectorAll('.list-entry');
        allListsDivs.forEach(list => {
            list.classList.remove('selected')

            const currenListTitle = list.getAttribute('data-title');
            if (currenListTitle === listTitle) list.classList.add('selected');    
        });

    }

    return {displayLists, removeAllTodos, displayAllTodos, selectList};
})();

const undoModal = (function() {
    const modal = document.querySelector('#modal-undo');

    function show() {
        modal.style.display = 'block';
    };

    function hide() {
        modal.style.display = 'none';
    };

    function setTitle(title) {
        const deletedTodoTextField = document.getElementById('deleted-todo');
        deletedTodoTextField.textContent = title;
    };

    return { show, hide, setTitle }
})();

const todoInput = (function() {
    const todoInput = document.getElementById('modal-add-todo');
    const todoForm = document.querySelector('#modal-add-todo form')

    function toggle() {
        todoInput.classList.toggle('show');
    };

    function getData() {
        const title = document.getElementById('ftitletodo').value;
        const description = document.getElementById('fdescriptiontodo').value;
        const date = document.getElementById('fdatetodo').valueAsDate;
        const priority = document.getElementById('fprioritytodo').value;

        return {type: 'todo', title, description, date, priority}
    };

    function resetForm() {
        todoForm.reset();
    };

    return {toggle, getData, resetForm};
})();

const listInput = (function() {
    const todoInput = document.getElementById('modal-add-list');
    const listForm = document.querySelector('#modal-add-list form')

    function toggle() {
        todoInput.classList.toggle('show');
    };

    function getData() {
        const title = document.getElementById('ftitlelist').value;
        const description = document.getElementById('fdescriptionlist').value;
        
        return {type: 'list', title, description};
    };

    function resetForm() {
        listForm.reset();
    };

    return {toggle, getData, resetForm};
})();

const statisticsDOM = (function() {
    function displayCompleted(amount) {
        const counter = document.getElementById('completed-tasks');
        counter.textContent = String(amount);
    };

    function displayPending(amount) {
        const counter = document.getElementById('pending-tasks');
        counter.textContent = String(amount);
    };

    return {displayCompleted, displayPending}
})();

export { domManipulation, undoModal, todoInput, listInput, statisticsDOM};