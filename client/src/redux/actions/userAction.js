import axios from "axios";

export const userRegistration = (username, email, password) => async (dispatch) => {

    try {

        dispatch({
            type: "USER_REGISTRATION_REQUEST",
        });
        const config = {
            "Content-type": "application/json",
        }
        const { data } = await axios.post(
            "http://localhost:5000/users/signup",
            { username, email, password, },
            config
        );

        dispatch({
            type: "USER_REGISTRATION_SUCCESS",
            payload: data,
        });
        // console.log(data);
    } catch (error) {

        dispatch({
            type: "USER_REGISTRATION_FAIELD",
            payload: error.message,
        });
        //  console.log(error.message);
    }
}

export const userLogin = (email, password) => async (dispatch) => {

    try {

        dispatch({
            type: "USER_LOGIN_REQUEST",
        });
        const config = {
            "Content-type": "application/json",
        }
        const { data } = await axios.post(
            "http://localhost:5000/users/login",
            { email, password },
            config
        );

        dispatch({
            type: "USER_LOGIN_SUCCESS",
            payload: data,
        });
        // console.log(data);

        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {

        dispatch({
            type: "USER_LOGIN_FAIELD",
            payload: error.message,

        });
    }
}

// logout action
export const userLogout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({
      type: "USER_LOGOUT",
    });
  };