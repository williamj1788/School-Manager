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
      // TODO: add path for 500
      if (!err.response) {
        // TODO: notify user that they are offline
        return;
      }

      if(err.response.status === 401){
        localStorage.removeItem("user");
        dispatch({ type: "UNAUTH_USER"});
        return;
      }
    }
  };
}

export function createClass(form) {
  return async dispatch => {
    await Db.init();

    const newClass = await Db.createClass(form);
    dispatch({type: "ADD_CLASS", payload: newClass});
    try {
      await axios.post("/api/class", newClass, {withCredentials: true});
    } catch (err) {
      // TODO: add error handling
      console.error(err);
    }
  };
}

export function deleteClass(id) {
  return async dispatch => {
    // TODO: send delete request to server
    dispatch({type: "DELETE_CLASS", payload: id});
    try {
      await axios.delete(`/api/class/${id}`);
    } catch (err) {
      // TODO: add error handling
      console.error(err);
    }
    
  }
}

export function signOut() {
  return async dispatch => {
    try {
      await axios.post("/api/user/signout");
      localStorage.removeItem("user");
      dispatch({type: "SIGNOUT"});
    } catch (err) {
      // TODO: add error handling
      console.error(err);
    }
    
  }
}
