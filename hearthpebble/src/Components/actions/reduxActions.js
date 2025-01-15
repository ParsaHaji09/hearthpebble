import axios from "axios";
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, } from "../options/reduxConstants"

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST});

        const config = {
            headers: {
              "Content-type":"application/json",
            }
          };
          
          const { data } = await axios.post('http://localhost:5001/api/users/login', {
            username: username, 
            password: password,
          }, config);
    
          // local storage for our email and password
          //console.log(data);
          localStorage.setItem('saveData', JSON.stringify(data));

          dispatch({ type: LOGIN_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
    }
}

export const register = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });

    const config = {
      header: {
        "Content-type":"application/json",
      },
    };

    const regData = await axios.post("http://localhost:5001/api/users/", {
      username: username,
      password: password,
    }, config);

    //localStorage.setItem("saveData", JSON.stringify(regData.data));
    dispatch({ type: REGISTER_SUCCESS, payload: regData.data });
    console.log("Register success!");

  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response && error.response.data.message ? error.response.data.message : error.message, });
  }
}

export const logout = () => async(dispatch) => {
  localStorage.removeItem("saveData");
  dispatch({ type: LOGOUT });
}