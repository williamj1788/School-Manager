export function setClass(payload) {
    return { type: "SET_CLASS", payload };
};
export function addClass(payload) {
    return { type: "ADD_CLASS", payload };
};
export function addTask(payload) {
    return { type: "ADD_TASK", payload };
};
export function addTest(payload) {
    return { type: "ADD_TEST", payload };
};
export function removeTask(payload) {
    return { type: "REMOVE_TASK", payload };
};
export function removeTest(payload) {
    return { type: "REMOVE_TEST", payload };
};