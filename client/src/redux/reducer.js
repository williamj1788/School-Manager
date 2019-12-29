const isGuess = sessionStorage.getItem("guest") === "true";

const initialState = {
  user: {
    isAuthenticated: false,
    email: ""
  }
};

// currying here so we can pass different initialStates for testing purposes
export function createReducer(initState) {
  return (state, action) => {
    if (!state) state = initState;
    switch (action.type) {
      case "FETCH_USER":
        const { email } = action.payload;
        return {
          ...state,
          user: {
            isAuthenticated: true,
            email
          }
        };
      default:
        return state;
    }
  };
}

export default createReducer(initialState);
