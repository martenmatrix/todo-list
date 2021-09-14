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

    function _selectList(listTitle) {
        selectedList = listTitle;
    }
    
    function _removeList(e) {
        const listTitle = (e.target.parentNode).getAttribute('data-title');
        lists.deleteList(listTitle);

        console.log(lists.getListsArray());

        const currentList = lists.getListsArray();
        if (!(currentList.length === 0)) _selectList(currentList[0].title);

        _displayItems();
        _setCookies();
        window.location.reload();
    };

    function _addTodoFromModal() {
        if (selectedList === undefined) {
            alert('Please create a list before adding a todo!');
            return;
        }

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
        _setCookies();
    };

    function _addListFromModal() {
        let firstListEntry = false;
        if (lists.getListsArray().length === 0) firstListEntry = true;

        listInput.toggle();

        const data = listInput.getData();
        const listTitle = data.title;
        const listDescription = data.description;

        lists.createList(listTitle);
        lists.setDescription(listTitle, listDescription);
        listInput.resetForm();

        if (firstListEntry === true) _selectList(listTitle);

        _displayItems();
        _setCookies();
    };

    function _addListEventListeners() {
        //If multiple identical EventListeners are registered on the same EventTarget with the same parameters, the duplicate instances are discarded.
        listenFor.deleteListButton(_removeList);
        listenFor.clickOnList((e) => {
            _selectList(e.currentTarget.dataset.title)
            _displayItems();
        });
    };
    _addListEventListeners();


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
        if (currentLists.length === 0) {
            selectedList = undefined;
            return;
        };

        domManipulation.displayLists(currentLists);

        const currentTodoArray = lists.getTodoArray(selectedList);
        domManipulation.removeAllTodos();
        if (!(currentTodoArray.length === 0)) {
            domManipulation.displayAllTodos(currentTodoArray);
        }

        _addListEventListeners();
        domManipulation.selectList(selectedList);
    };

    //deletes wrong list

    function run() {
        const listsCookie = _getCookies()
        console.log(listsCookie);
        console.log(listsCookie == null);

        //checks for cookies and sets them if there are some,
        //if there are none creates a default list and selects it
        if (listsCookie != null)  {
            let cookie = _getCookies();
            lists.setListsArray(cookie);
            const currentLists = lists.getListsArray();
            if (currentLists.length === 0) return;
            _selectList(currentLists[0].title);
            _displayItems();
        } else {
            const defaultListTitle = 'Default List';

            lists.createList(defaultListTitle);
            lists.setDescription(defaultListTitle, 'This is the default list. You can delete me, if you want to. :(');
            _selectList(defaultListTitle);
        };
        console.log(lists.getListsArray());
    };

    return {run};
})();

main.run();