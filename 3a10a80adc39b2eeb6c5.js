import './style.css';
import { lists, todos } from './data';
import listenFor from './eventlistener';
import { domManipulation, undoModal, todoInput, listInput } from './dom';
import statistics from './statistics';

var main = function () {
  //define event listeners
  var selectedList = undefined;

  function _getCookies() {
    var objectJSON = localStorage.getItem('listsObject');
    return JSON.parse(objectJSON); //convert json to object and return it
  }

  ;

  function _setCookies() {
    var listsObject = lists.getListsArray();
    var objectJSON = JSON.stringify(listsObject);
    localStorage.setItem('listsObject', objectJSON);
  }

  ;

  function _removeTodo(title) {
    todos.removeTodo(selectedList, title);
    statistics.removeOpen();
    statistics.addCompleted();

    _displayItems();

    _setCookies();

    undoModal.setTitle(title);
    undoModal.show();
  }

  ;
  listenFor.undoButton(function () {
    undoModal.hide();
    todos.backToBackupList();

    _setCookies();

    _displayItems();
  });

  function _selectList(listTitle) {
    selectedList = listTitle;
  }

  function _removeList(e) {
    var listTitle = e.target.parentNode.getAttribute('data-title');
    lists.deleteList(listTitle);
    var currentList = lists.getListsArray();
    if (!(currentList.length === 0)) _selectList(currentList[0].title);

    _displayItems();

    _setCookies();

    window.location.reload();
  }

  ;

  function _addTodoFromModal() {
    if (selectedList === undefined) {
      alert('Please create a list before adding a todo!');
      return;
    }

    todoInput.toggle();
    var data = todoInput.getData();
    var title = data.title;
    var description = data.description;
    var date = data.date;
    var priority = data.priority;
    todoInput.resetForm();
    statistics.addOpen();
    todos.addTodo(selectedList, title);
    todos.setParameters(selectedList, title, description, date, priority);

    _displayItems();

    _setCookies();
  }

  ;

  function _addListFromModal() {
    var firstListEntry = false;
    if (lists.getListsArray().length === 0) firstListEntry = true;
    listInput.toggle();
    var data = listInput.getData();
    var listTitle = data.title;
    var listDescription = data.description;
    lists.createList(listTitle);
    lists.setDescription(listTitle, listDescription);
    listInput.resetForm();
    if (firstListEntry === true) _selectList(listTitle);

    _displayItems();

    _setCookies();
  }

  ;

  function _addTodoEventListeners() {
    listenFor.deleteTodoButton(function (e) {
      return _removeTodo(e.currentTarget.parentNode.parentNode.dataset.title);
    });
  }

  ;

  _addTodoEventListeners();

  function _addListEventListeners() {
    //If multiple identical EventListeners are registered on the same EventTarget with the same parameters, the duplicate instances are discarded.
    listenFor.deleteListButton(_removeList);
    listenFor.clickOnList(function (e) {
      _selectList(e.currentTarget.dataset.title);

      _displayItems();
    });
  }

  ;

  _addListEventListeners(); //addButtons


  listenFor.addListButton(listInput.toggle);
  listenFor.addTodoButton(todoInput.toggle); //close addButtons

  listenFor.closeListButton(listInput.toggle);
  listenFor.closeTodoButton(todoInput.toggle); //sumbit forms buttons

  listenFor.submitListButton(_addListFromModal);
  listenFor.submitTodoButton(_addTodoFromModal);

  function _displayItems() {
    var currentLists = lists.getListsArray();

    if (currentLists.length === 0) {
      selectedList = undefined;
      return;
    }

    ;
    domManipulation.displayLists(currentLists);
    var currentTodoArray = lists.getTodoArray(selectedList);
    domManipulation.removeAllTodos();

    if (!(currentTodoArray.length === 0)) {
      domManipulation.displayAllTodos(currentTodoArray);

      _addTodoEventListeners();
    }

    _addListEventListeners();

    domManipulation.selectList(selectedList);
  }

  ; //deletes wrong list

  function run() {
    var listsCookie = _getCookies(); //checks for cookies and sets them if there are some,
    //if there are none creates a default list and selects it


    if (listsCookie != null) {
      var cookie = _getCookies();

      lists.setListsArray(cookie);
      var currentLists = lists.getListsArray();
      if (currentLists.length === 0) return;

      _selectList(currentLists[0].title);

      _displayItems();
    } else {
      var defaultListTitle = 'Default List';
      lists.createList(defaultListTitle);
      lists.setDescription(defaultListTitle, 'This is the default list. You can delete me, if you want to. :(');

      _selectList(defaultListTitle);

      _displayItems();
    }

    ;
  }

  ;
  return {
    run: run
  };
}();

main.run();