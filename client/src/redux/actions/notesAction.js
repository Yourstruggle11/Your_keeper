import axios from "axios";

const url = "http://localhost:5000/users/notes";

export const getPost = () => async (dispatch, getState) => {

    try {
        const { userLogin: { userInfo }, } = getState();
        // console.log(userInfo.token);
        const config = {
            "Content-Type": "application/json",
            headers:{
                Authorization: `Bearer ${userInfo.token}`
            },
        };
        const {data} = await axios.get(url, config);
        // console.log(data);
    const action = { type: "GET_POST", payload: data };
        dispatch(action)


    } catch (error) {
        //console.log(error);
    }

};

export const postNote = (title, body) => async (dispatch, getState) => {

    try {
        const { userLogin: { userInfo }, } = getState();
        // console.log(userInfo.token);
        const config = {
            "Content-Type": "application/json",
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.post(url, {title, body}, config);
         //console.log(data);
    const action = { type: "POST_NOTE", payload: data };
        dispatch(action)


    } catch (error) {
        //console.log(error);
    }

};

export const updateNote = (id, title, body) => async (dispatch, getState) => {

    try {
        const { userLogin: { userInfo }, } = getState();
        // console.log(userInfo.token);
        const config = {
            "Content-Type": "application/json",
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.put(`${url}/${id}`, {title, body}, config);
        //  console.log(data);
    const action = { type: "UPDATE", payload: data };
        dispatch(action)


    } catch (error) {
        //console.log(error);
    }

};

export const deleteNote = (id) => async (dispatch, getState) => {

    try {
        const { userLogin: { userInfo }, } = getState();
        // console.log(userInfo.token);
        const config = {
            "Content-Type": "application/json",
            headers:{
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const {data} = await axios.delete(`${url}/${id}`, config);
        // console.log(data);
    const action = { type: "DELETE", payload: data };
        dispatch(action)


    } catch (error) {
        //console.log(error);
    }

};