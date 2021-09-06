/* on start check for cookies and apply them
on every new button press set new cookies

if user deleted a list must remove list from list array, clean todos dom and regenerate list dom
if user deletes list must remove todo from list items array and regenrate todo page, plus insert undo module like below, maybe savce the last array in a misc function

if user adds todo add to array and update dom
if user deletes todo remove from array update dom and save in var as last todo + display last delted
if user undos remove fromm array add back to list and remove the displayed undo


*/

            //undo last action considered
            //implement that in lists module so it saves a copy, if it changes and then an undo function is avaible to change everything back to before state

const listenFor = (function() {
    function undoButton(functionToExecute) {
        const undoButtonImg = document.querySelector('#undo-todo-modal img');
        undoButtonImg.addEventListener('click', functionToExecute);
    };

    function addListButton(functionToExecute) {
        const addButton = document.querySelector('#lists .add');
        addButton.addEventListener('click', functionToExecute);
    };

    function addTodoButton(functionToExecute) {
        const addButton = document.querySelector('#todos .add');
        addButton.addEventListener('click', functionToExecute);
    };
    
    function closeListButton(functionToExecute) {
        const closeArea = document.querySelector('#modal-add-list');
        closeArea.addEventListener('click', (e) => {
            if (e.target.id != 'modal-add-list') return;
            functionToExecute()
        });
    };
    
    function closeTodoButton(functionToExecute) {
        const closeArea = document.querySelector('#modal-add-todo');
        closeArea.addEventListener('click', (e) => {
            if (e.target.id != 'modal-add-todo') return;
            functionToExecute();
        });
    };

    function _submitForm(e) {
        e.preventDefault();
        this.reset();
    };

    function submitListButton() {
        const listForm = document.querySelector('#modal-add-list .modal');
        listForm.addEventListener('submit', _submitForm);
    };

    function submitTodoButton() {
        const todoForm = document.querySelector('#modal-add-todo .modal');
        todoForm.addEventListener('submit', _submitForm);
    };

    return {undoButton, addListButton, addTodoButton, closeListButton, closeTodoButton, submitListButton, submitTodoButton};
})();

export default listenFor;