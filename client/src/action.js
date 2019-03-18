export function setClass(payload) {
    return { type: "SET_CLASS", payload };
};

export function addClass(payload) {
    return { type: "ADD_CLASS", payload };
};

export function removeTask(payload) {
    return { type: "REMOVE_TASK", payload };
};
export function removeTest(payload) {
    return { type: "REMOVE_TEST", payload };
};