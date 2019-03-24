import uuid from 'uuid';
const initialState = {
    username: null,
    classes: [],
    tasks: [{id: uuid(), name: 'finish homework', due: '2019-06-10'},{id: uuid(),name: 'do stuff', due: '2019-03-17'},{id: uuid(),name: 'do more stuff', due: '2019-03-14'},{id: uuid(),name: 'Test1', due: '2019-03-27'},{id: uuid(), name: 'Test2', due: '2019-03-24'}],
    tests: [{id: uuid(),name: 'Test1', due: '2019-06-10'},{id: uuid(),name: 'Test2', due: '2019-03-17'},{id: uuid(),name: 'Test3', due: '2019-03-14'},{id: uuid(),name: 'Test4', due: '2019-03-27'},{id: uuid(), name: 'Test5', due: '2019-03-24'}],
};

function reducer(state = initialState,action){
    if(action.type === 'ADD_CLASS'){
        let copyStateClasses = state.classes.slice();
        copyStateClasses.push(action.payload);
        return Object.assign({}, state, {
            classes: copyStateClasses,
        });
    }else if(action.type === 'ADD_TASK'){
        let task = {
            id: uuid(),
            name: action.payload.name,
            due: action.payload.due,
        }
        let copyOfStateTasks = state.tasks.slice();
        copyOfStateTasks.push(task);
        return Object.assign({}, state, {
            tasks: copyOfStateTasks
        });
    }else if(action.type === 'ADD_TEST'){
        let Test = {
            id: uuid(),
            name: action.payload.name,
            due: action.payload.due,
        }
        let copyOfStateTests = state.tests.slice();
        copyOfStateTests.push(Test);
        return Object.assign({}, state, {
            tests: copyOfStateTests
        });
    }else if(action.type === 'SET_CLASS'){
        return Object.assign({}, state, {
            classes: action.payload
        });
    }else if(action.type === 'REMOVE_TASK'){
        let copy = state.tasks.slice();
        copy.splice(action.payload,1);
        return Object.assign({}, state, {
            tasks: copy
        });
    }else if(action.type === 'REMOVE_TEST'){
        let copy = state.tests.slice();
        copy.splice(action.payload,1);
        return Object.assign({}, state, {
            tests: copy
        });
    }
    
    return state;
}

export default reducer;