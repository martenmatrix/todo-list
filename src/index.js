import './style.css';
import { lists, todos } from './data';
import listenFor from './eventlistener'
import { domManipulation, undoModal, todoInput, listInput } from './dom';


const addButton = document.querySelector('#lists .add');
console.log(addButton);
addButton.addEventListener('click', () => console.log('die kacke geht doch'));

const main = (function () {
    //define event listeners
    listenFor.addListButton(listInput.toggle);

    //try out what a created dom returns if its a object, try to add a event listener with it
})();