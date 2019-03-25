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
    classID: null,
};

function reducer(state = initialState,action){
    if(action.type === 'ADD_CLASS'){
        let copyStateClasses = state.classes.slice();
        copyStateClasses.push(action.payload);
        return Object.assign({}, state, {
            classes: copyStateClasses,
        });
    }else if(action.type === 'ADD_TASK'){
        let copy = state.classes.slice();
        copy[state.classIndex].tasks.push(action.payload);
        return Object.assign({}, state, {
            classes: copy
        });
    }else if(action.type === 'ADD_TEST'){
        let Test = {
            id: uuid(),
            name: action.payload.name,
            due: action.payload.due,
        }
        let copy = state.classes.slice();
        copy[state.classIndex].tests.push(Test);
        return Object.assign({}, state, {
            classes: copy,
        });
    }else if(action.type === 'SET_USER'){
        return Object.assign({}, state, {
            username: action.payload.username,
            classes: action.payload.classes,
        });
    }else if(action.type === 'SET_CLASS_INDEX'){
        let copy = state.classes.slice();
        return Object.assign({}, state, {
            classIndex: action.payload,
            classID: copy[action.payload]._id
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
        let copy = state.classes.slice();
        copy[state.classIndex].tests = copy[state.classIndex].tests.filter(test => {
            return test.id !== action.payload;
        });
        return Object.assign({}, state, {
            classes: copy
        });
    }
    
    return state;
}

export default reducer;