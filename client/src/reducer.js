const initialState = {
    username: null,
    classes: [],
    tasks: [{name: 'finish homework', due: '7'},{name: 'do stuff', due: '2'},{name: 'do more stuff', due: '4'}],
    tests: [],
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
    }
    
    return state;
}

export default reducer;