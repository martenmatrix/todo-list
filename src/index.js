import './style.css';
import { lists, todos } from './data';
import listenFor from './eventlistener'
import { domManipulation, undoModal, todoInput, listInput } from './dom';

const main = (function () {
    //define event listeners
    let selectedList = undefined;

    function _getCookies() {
        const objectJSON = localStorage.getItem('listsObject');
        return JSON.parse(objectJSON); //convert json to object and return it
    };
    
    function _setCookies() {
        const listsObject = lists.getListsArray();
        const objectJSON = JSON.stringify(listsObject);
        localStorage.setItem('listsObject', objectJSON);
    };

    
    function _removeTodo(title) {
        
    };
    
    function _removeList(e) {
        const listTitle = (e.target.parentNode).getAttribute('data-title');
        lists.deleteList(listTitle);
        _displayItems();
        _setCookies();
        window.location.reload();
    };

    function _addTodoFromModal() {
        todoInput.toggle();

        const data = todoInput.getData();
        const title = data.title;
        const description = data.description;
        const date = data.date;
        const priority = data.priority;

        todoInput.resetForm();

        todos.addTodo(selectedList, title);
        todos.setParameters(selectedList, title, description, date, priority);
        _displayItems();
    };

    function _addListFromModal() {
        listInput.toggle();

        const data = listInput.getData();
        const listTitle = data.title;
        const listDescription = data.description;

        lists.createList(listTitle);
        lists.setDescription(listTitle, listDescription);
        listInput.resetForm();

        _displayItems();
        _setCookies();
    };

    function _selectList(listTitle) {
        selectedList = listTitle;
    }

    function _addEventListeners() {
        //If multiple identical EventListeners are registered on the same EventTarget with the same parameters, the duplicate instances are discarded.
        listenFor.deleteListButton(_removeList);
        listenFor.clickOnList((e) =>_selectList(e.currentTarget.dataset.title));
    };
    _addEventListeners();


    //addButtons
    listenFor.addListButton(listInput.toggle);
    listenFor.addTodoButton(todoInput.toggle);

    //close addButtons
    listenFor.closeListButton(listInput.toggle);
    listenFor.closeTodoButton(todoInput.toggle);

    //sumbit forms buttons
    listenFor.submitListButton(_addListFromModal);
    listenFor.submitTodoButton(_addTodoFromModal);

    function _displayItems() {
        const currentLists = lists.getListsArray();
        domManipulation.displayLists(currentLists);

        const currentTodoArray = lists.getTodoArray(selectedList);
        domManipulation.removeAllTodos();
        domManipulation.displayAllTodos(currentTodoArray);

        _addEventListeners();
    };

    function run() {
        const listsCookie = _getCookies()
        console.log(listsCookie);

        //checks for cookies and sets them if there are some,
        //if there are none creates a default list and selects it
        if (listsCookie != null)  {
            let cookie = _getCookies();
            lists.setListsArray(cookie);
            selectedList = lists.getListsArray()[0].title;
            _displayItems();
        } else {
            const defaultListTitle = 'Default List';

            lists.createList(defaultListTitle);
            lists.setDescription(defaultListTitle, 'This is the default list. You can delete me, if you want to. :(');
            _selectList(defaultListTitle);

            _displayItems();
        };
    };

    return {run};
})();

main.run();