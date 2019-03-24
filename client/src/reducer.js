import uuid from 'uuid';
const initialState = {
    username: null,
    classes: [
        {
            name: 'Math',
            color: '#000000',
            tasks:  [
                {id: uuid(), name: 'Math1', due: '2019-06-10'},
                {id: uuid(),name: 'Math2', due: '2019-03-17'},
                {id: uuid(),name: 'Math3', due: '2019-03-14'},
            ],
            tests: [
                {id: uuid(),name: 'Test1', due: '2019-06-10'},
                {id: uuid(),name: 'Test2', due: '2019-03-17'},
                {id: uuid(),name: 'Test3', due: '2019-03-14'},
            ],
        },
        {
            name: 'History',
            color: '#000000',
            tasks:  [
                {id: uuid(), name: 'History1', due: '2019-06-10'},
                {id: uuid(),name: 'History2', due: '2019-03-17'},
                {id: uuid(),name: 'History3', due: '2019-03-14'},
            ],
            tests: [
                {id: uuid(),name: 'Test1', due: '2019-06-10'},
                {id: uuid(),name: 'Test2', due: '2019-03-17'},
                {id: uuid(),name: 'Test3', due: '2019-03-14'},
            ],
        },
        {
            name: 'English',
            color: '#c1424b',
            tasks:  [
                {id: uuid(), name: 'English1', due: '2019-06-10'},
                {id: uuid(),name: 'English2', due: '2019-03-17'},
                {id: uuid(),name: 'English3', due: '2019-03-14'},
            ],
            tests: [
                {id: uuid(),name: 'Test1', due: '2019-06-10'},
                {id: uuid(),name: 'Test2', due: '2019-03-17'},
                {id: uuid(),name: 'Test3', due: '2019-03-14'},
            ],
        },
    ],
    classIndex: null,
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
    }else if(action.type === 'SET_CLASS_INDEX'){
        return Object.assign({}, state, {
            classIndex: action.payload
        });
    }else if(action.type === 'REMOVE_TASK'){
        let copy = state.classes.slice();
        copy[state.classIndex].tasks = copy[state.classIndex].tasks.filter(task => {
            return task.id !== action.payload;
        });
        return Object.assign({}, state, {
            classes: copy
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