import axios from "axios";

export function fetchUser() {
  return async dispatch => {
    try {
      if (localStorage.user) {
        const data = JSON.parse(localStorage.user);
        dispatch({ type: "FETCH_USER", payload: data });
      }
      const { data } = await axios.get("/api/user", { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "FETCH_USER", payload: data });
    } catch (err) {
      // TODO: add path for 401 and 500
      if (!err.response) {
        const data = JSON.parse(localStorage.user);
        return dispatch({ type: "FETCH_USER", payload: data });
      }
    }
  };
}
