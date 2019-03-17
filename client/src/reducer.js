const initialState = {
    username: null,
    classes: [],
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