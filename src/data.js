const lists = (function() {
    let lists = [];

    function List() {
        this.title = undefined;
        this.description = undefined;
        this.items = [];
    };

    function _getIndexOfList(title) {
        const isList = (entry) => entry.title === title;
        const index = lists.findIndex(isList);

        return index;
    }

    function createList(title) {
        const newList =  new List();
        newList.title = title;
        lists.push(newList);
    };

    function deleteList(title) {
        const index = _getIndexOfList(title);

        if (index === -1) console.error('List does not exist.');
        if (index !== -1) lists.splice(index, 1);
    };

    function getListObject(title) {
        const index = _getIndexOfList(title);
        return lists[index];
    };

    function setDescription(title, description) {
        const index = _getIndexOfList(title);
        lists[index].description = description;
    };

    function getTodoArray(title) {
        const index = _getIndexOfList(title);
        return lists[index].items;
    };

    function setTodoArray(title, newArray) {
        const index = _getIndexOfList(title);
        lists[index].title = newArray;
    };

    return {createList, deleteList, getListObject, setDescription, getTodoArray, setTodoArray}
})();

const todos = (function() {

    function Todo() {
        this.title = undefined;
        this.description = undefined;
        this.date = undefined;
        this.priority = undefined;
    };

    function _findIndex(list, title) {
        const isTitle = (entry.title) === title;
        const index = lists._findIndex(isTitle);
        return index;
    };

    function addTodo(list, title) {
        //todo check if already exists
        const array = lists.getTodoArray(list);
        const newTodo = new Todo();
        newTodo.title = title;
        lists.setTodoArray(newTodo);
    };

    function removeTodo(list, title) {
        const array = lists.getTodoArray(list);
        const index = _findIndex(array, title);
        array.splice(index, 1);
        setTodoArray(title, array);
    };

    function setParameters(list, title, description, date, priority) {
        const array = lists.getTodoArray(list);
        const index = _findIndex(array, title);
        array[index].description = description;
        array[index].date = date;
        array[index].priority = priority;
        lists.setTodoArray(title, array);
    };

    function getTodoObject() {
        const array = lists.getTodoArray(list);
        const index = _findIndex(array, title);
        return array[index];
    };

    return {addTodo, removeTodo, setParameters, getTodoObject};

})();

export {lists, todos};