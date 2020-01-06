
const initialState = {
  isFetchingUser: true,  
  user: {
    isAuthenticated: false,
    email: null
  },
  classes: []
};

// currying here so we can pass different initialStates for testing purposes
export function createReducer(initState) {
  return (state, action) => {
    if (!state) state = initState;
    switch (action.type) {
      case "FETCH_USER":
        const { email, classes } = action.payload;
        return {
          ...state,
          isFetchingUser: false,
          user: {
            isAuthenticated: true,
            email
          },
          classes,
        };
      case "UNAUTH_USER": 
        return {
          ...state,
          isFetchingUser: false,
          user: {
            isAuthenticated: false,
            email: null
          }
        };
      case "ADD_CLASS":
        return {
          ...state,
          classes: [...state.classes, action.payload]
        }
      case "DELETE_CLASS":
        const index = state.classes.findIndex(c => c._id === action.payload);
        state.classes.splice(index, 1);
        return {
          ...state,
          classes: [...state.classes]
        }
      default:
        return state;
    }
  };
}

export default createReducer(initialState);
