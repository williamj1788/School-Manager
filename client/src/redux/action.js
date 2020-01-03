import axios from "axios";
import Db from "../Db/Db";

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

export function createClass(form) {
  return async dispatch => {
    await Db.init();

    const newClass = await Db.createClass(form);

    dispatch({});
  };
}
