import './style.css';
import { lists, todos } from './data';

lists.createList('list1');
const currentList = lists.getListObject('list1');
console.log(currentList);