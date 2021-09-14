import { statisticsDOM } from "./dom";

const statistics = (function() {

    let statistics = {
        completedTasks: 0,
        openTasks: 0,
    };

    function _display() {
        statisticsDOM.displayCompleted(statistics.completedTasks);
        statisticsDOM.displayPending(statistics.openTasks);
    }

    function _setCookie() {
        const statisticsJSON = JSON.stringify(statistics);
        localStorage.setItem('statistics', statisticsJSON);
    };

    function _getCookie() {
        const statisticsJSON = localStorage.getItem('statistics');
        if (statisticsJSON === null) return;
        statistics = JSON.parse(statisticsJSON);

        _display();
    };

    const addCompleted = () => {
        statistics.completedTasks++;
        _setCookie();
        _display();
    };
    const removeCompleted = () => {
        statistics.completedTasks--;
        _setCookie();
        _display();
        };
    const addOpen = () => {
        statistics.openTasks++;
        _setCookie();
        _display();
    };
    const removeOpen = () => {
        statistics.openTasks--;
        _setCookie();
        _display();
    };

    _getCookie();
    return {addCompleted, removeCompleted, addOpen, removeOpen};
})()

export default statistics;