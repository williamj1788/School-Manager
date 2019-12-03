import uuid from 'uuid';
import moment from 'moment';

const isGuess = sessionStorage.getItem('guest') === "true";


const initialState = {
    username: 'Guest',
    classes: [
        {
            _id: uuid(),
            name: 'Math',
            color: '#000000',
            Tasks:  [
                {_id: uuid(), name: 'Math1', due: moment().add(5, 'd')},
                {_id: uuid(),name: 'Math2', due: moment().add(3, 'd')},
                {_id: uuid(),name: 'Math3', due: moment().add(1, 'd')},
            ],
            Tests: [
                {_id: uuid(),name: 'Test1', due: moment().add(5, 'd')},
                {_id: uuid(),name: 'Test2', due: moment().add(3, 'd')},
                {_id: uuid(),name: 'Test3', due: moment().add(1, 'd')},
            ],
        },
        {
            _id: uuid(),
            name: 'History',
            color: '#000000',
            Tasks:  [
                {_id: uuid(), name: 'History1', due: moment().add(5, 'd')},
                {_id: uuid(),name: 'History2', due: moment().add(3, 'd')},
                {_id: uuid(),name: 'History3', due: moment().add(1, 'd')},
            ],
            Tests: [
                {_id: uuid(),name: 'Test1', due: moment().add(5, 'd')},
                {_id: uuid(),name: 'Test2', due: moment().add(3, 'd')},
                {_id: uuid(),name: 'Test3', due: moment().add(1, 'd')},
            ],
        },
        {
            _id: uuid(),
            name: 'English',
            color: '#c1424b',
            Tasks:  [
                {_id: uuid(), name: 'English1', due: moment().add(5, 'd')},
                {_id: uuid(),name: 'English2', due: moment().add(3, 'd')},
                {_id: uuid(),name: 'English3', due: moment().add(1, 'd')},
            ],
            Tests: [
                {_id: uuid(),name: 'Test1', due: moment().add(5, 'd')},
                {_id: uuid(),name: 'Test2', due: moment().add(3, 'd')},
                {_id: uuid(),name: 'Test3', due: moment().add(1, 'd')},
            ],
        },
    ],
    classIndex: null,
    classID: null,
    isGuess,
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
    }else if(action.type === 'TOGGLE_GUEST_FALSE'){
        sessionStorage.setItem('guest', false);
        return{
            ...state,
            isGuess: false,
        }
    }else if(action.type === 'TOGGLE_GUEST_TRUE'){
        sessionStorage.setItem('guest', true);
        return{
            ...initialState,
            isGuess: true,
        }
    }
    
    return state;
}

export default reducer;