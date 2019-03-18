const initialState = {
    username: null,
    classes: [],
    tasks: [{name: 'finish homework', due: '7'},{name: 'do stuff', due: '2'},{name: 'do more stuff', due: '4'}],
    tests: [{name: 'Test1', due: '7'},{name: 'Test2', due: '2'},{name: 'Test3', due: '4'}],
};

function reducer(state = initialState,action){
    if(action.type === 'ADD_CLASS'){
        let copyStateClasses = state.classes.slice();
        copyStateClasses.push(action.payload);
        return Object.assign({}, state, {
            classes: copyStateClasses,
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