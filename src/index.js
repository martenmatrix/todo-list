import './style.css';
import { lists, todos } from './data';

lists.createList('list1');

todos.addTodo('list1', 'need to do this');
todos.addTodo('list1', 'second thing to do');

todos.removeTodo('list1', 'need to do this');
todos.removeTodo('list1', 'second thing to do');
const currentList = lists.getListObject('list1');
console.log(currentList);