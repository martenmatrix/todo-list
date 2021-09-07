import './style.css';
import { lists, todos } from './data';
import listenFor from './eventlistener'
import { domManipulation, undoModal, todoInput, listInput } from './dom';

const main = (function () {
    //define event listeners

    function _getCookies() {
        const objectJSON = localStorage.getItem('listObject');
        return JSON.parse(objectJSON); //convert json to object and return it
    };
    
    function _setCookies(listsObject) {
        const objectJSON = JSON.stringify(listsObject);
        localStorage.setItem('listsObject', objectJSON);
    };

    
    function _removeTodo(title) {
        
    };
    
    function _removeList(title) {
        
    };

    function _addTodoFromModal() {
        todoInput.getData()
        todoInput.resetForm();
        todoInput.toggle();
    };

    function _addListFromModal() {
        listInput.toggle();

        const data = listInput.getData();
        const listTitle = data.title;
        const listDescription = data.description;

        lists.createList(listTitle);
        lists.setDescription(listTitle, listDescription);
        listInput.resetForm();

        const newListArray = lists.getListsArray();
        domManipulation.displayLists(newListArray);
        _setCookies(listsObject);
    };

    //addButtons
    listenFor.addListButton(listInput.toggle);
    listenFor.addTodoButton(todoInput.toggle);

    //close addButtons
    listenFor.closeListButton(listInput.toggle);
    listenFor.closeTodoButton(todoInput.toggle);
    //sumbit forms buttons
    listenFor.submitListButton(_addListFromModal);
    listenFor.submitTodoButton(_addTodoFromModal);
    //try out what a created dom returns if its a object, try to add a event listener with it

    function run() {

    };

    return {run};
})();