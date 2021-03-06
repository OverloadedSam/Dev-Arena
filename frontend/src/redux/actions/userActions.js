import http from "../../services/http";
import auth from "../../services/authService";
import * as actions from "../action-types/userTypes";

export const registerUser = (payload) => async (dispatch) => {
    dispatch({ type: actions.USER_REGISTER_REQUESTED });

    try {
        const { data } = await http.post("/register", payload);
        dispatch({
            type: actions.USER_REGISTER_SUCCEEDED,
            payload: data,
        });

        const { token } = data;
        const user = {
            id: data._id,
            name: data.name,
            email: data.email,
        };

        auth.saveUserAndAuthToken(token, user);
    } catch (error) {
        dispatch({
            type: actions.USER_REGISTER_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const resetRegisterUser = () => (dispatch) => {
    dispatch({ type: actions.USER_REGISTER_RESET });
};

export const loginUser = (payload) => async (dispatch) => {
    dispatch({ type: actions.USER_LOGIN_REQUESTED });

    try {
        const { data } = await http.post("/login", payload);
        dispatch({
            type: actions.USER_LOGIN_SUCCEEDED,
            payload: data,
        });

        const { token } = data;
        const user = {
            id: data._id,
            name: data.name,
            email: data.email,
        };

        auth.saveUserAndAuthToken(token, user);
    } catch (error) {
        dispatch({
            type: actions.USER_LOGIN_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const resetLoginUser = () => (dispatch) => {
    dispatch({ type: actions.USER_LOGIN_RESET });
};
