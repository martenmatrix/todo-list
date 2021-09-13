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

        console.log(data);
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

    function _addEventListeners() {
        //If multiple identical EventListeners are registered on the same EventTarget with the same parameters, the duplicate instances are discarded.
        listenFor.deleteListButton(_removeList);
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
        console.log(currentLists);
        domManipulation.displayLists(currentLists);
        _addEventListeners();
    };

    function run() {
        const listsCookie = _getCookies()
        console.log(listsCookie);
        if (listsCookie != null)  {
            let cookie = _getCookies();
            lists.setListsArray(cookie);
            selectedList = lists.getListsArray()[0].title;
            _displayItems();
        };
    };

    return {run};
})();

main.run();