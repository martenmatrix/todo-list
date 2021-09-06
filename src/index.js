import './style.css';
import { lists, todos } from './data';
import listenFor from './eventlistener'
import { domManipulation, undoModal, todoInput, listInput } from './dom';

function getCookies() {

};

function setCookies() {

};

function addTodoFromModal(dataObject) {
    console.log(dataObject);
    todoInput.toggle();
};

function addListFromModal(dataObject) {
    console.log(dataObject);
    listInput.toggle();
};

function removeTodo(title) {

};

function removeList(title) {

};

const main = (function () {
    //define event listeners

    //addButtons
    listenFor.addListButton(listInput.toggle);
    listenFor.addTodoButton(todoInput.toggle);

    //close addButtons
    listenFor.closeListButton(listInput.toggle);
    listenFor.closeTodoButton(todoInput.toggle);

    //sumbit forms buttons
    listenFor.submitListButton(() => addListFromModal(listInput.getData()));
    listenFor.submitTodoButton(() => addTodoFromModal(todoInput.getData()));
    //try out what a created dom returns if its a object, try to add a event listener with it
})();