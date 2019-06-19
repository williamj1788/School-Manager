import uuid from 'uuid';
const initialState = {
    username: null,
    classes: [
        {
            _id: uuid(),
            name: 'Math',
            color: '#000000',
            tasks:  [
                {_id: uuid(), name: 'Math1', due: '2019-06-10'},
                {_id: uuid(),name: 'Math2', due: '2019-03-17'},
                {_id: uuid(),name: 'Math3', due: '2019-03-14'},
            ],
            tests: [
                {_id: uuid(),name: 'Test1', due: '2019-06-10'},
                {_id: uuid(),name: 'Test2', due: '2019-03-17'},
                {_id: uuid(),name: 'Test3', due: '2019-03-14'},
            ],
        },
        {
            _id: uuid(),
            name: 'History',
            color: '#000000',
            tasks:  [
                {_id: uuid(), name: 'History1', due: '2019-06-10'},
                {_id: uuid(),name: 'History2', due: '2019-03-17'},
                {_id: uuid(),name: 'History3', due: '2019-03-14'},
            ],
            tests: [
                {_id: uuid(),name: 'Test1', due: '2019-06-10'},
                {_id: uuid(),name: 'Test2', due: '2019-03-17'},
                {_id: uuid(),name: 'Test3', due: '2019-03-14'},
            ],
        },
        {
            _id: uuid(),
            name: 'English',
            color: '#c1424b',
            tasks:  [
                {_id: uuid(), name: 'English1', due: '2019-06-10'},
                {_id: uuid(),name: 'English2', due: '2019-03-17'},
                {_id: uuid(),name: 'English3', due: '2019-03-14'},
            ],
            tests: [
                {_id: uuid(),name: 'Test1', due: '2019-06-10'},
                {_id: uuid(),name: 'Test2', due: '2019-03-17'},
                {_id: uuid(),name: 'Test3', due: '2019-03-14'},
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
        copy[state.classIndex].Tasks.push(action.payload);
        return Object.assign({}, state, {
            classes: copy
        });
    }else if(action.type === 'ADD_TEST'){
        let copy = state.classes.slice();
        copy[state.classIndex].Tests.push(action.payload);
        return Object.assign({}, state, {
            classes: copy,
        });
    }else if(action.type === 'SET_USER'){
        return Object.assign({}, state, {
            username: action.payload.username,
            classes: action.payload.classes,
        });
    }else if(action.type === 'SET_CLASS_INDEX'){
        return Object.assign({}, state, {
            classIndex: action.payload,
            classID: state.classes[action.payload] ? state.classes[action.payload]._id  : null,
        });
    }else if(action.type === 'REMOVE_TASK'){
        let copy = state.classes.slice();
        copy[state.classIndex].Tasks = copy[state.classIndex].Tasks.filter(task => {
            return task._id !== action.payload;
        });
        return Object.assign({}, state, {
            classes: copy
        });
    }else if(action.type === 'REMOVE_TEST'){
        let copy = state.classes.slice();
        copy[state.classIndex].Tests = copy[state.classIndex].Tests.filter(test => {
            return test._id !== action.payload;
        });
        return Object.assign({}, state, {
            classes: copy
        });
    }else if(action.type === 'REMOVE_CLASS'){
        let copy = state.classes.slice();
        let index = copy.findIndex(x => x._id === action.payload);
        copy.splice(index, 1);
        return {
            ...state,
            classes: copy,
        }
    }
    
    return state;
}

export default reducer;