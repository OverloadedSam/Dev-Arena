import http from "../../services/http";
import * as actions from "../action-types/profileTypes";

export const listProfiles = () => async (dispatch) => {
    dispatch({ type: actions.PROFILES_LIST_REQUESTED });

    try {
        const { data } = await http.get("/profiles");
        dispatch({
            type: actions.PROFILES_LIST_SUCCEEDED,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.PROFILES_LIST_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const getCurrentUserProfile = () => async (dispatch) => {
    dispatch({ type: actions.CURRENT_USER_PROFILE_REQUESTED });

    try {
        const { data } = await http.get("/profile/me");
        dispatch({
            type: actions.CURRENT_USER_PROFILE_SUCCEEDED,
            payload: data.data.message ? null : data.data,
        });
    } catch (error) {
        const actionType =
            error.response.status === 404
                ? actions.CURRENT_USER_PROFILE_EMPTY
                : actions.CURRENT_USER_PROFILE_FAILED;

        const errorMsg =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;

        dispatch({
            type: actionType,
            payload: errorMsg,
        });
    }
};

export const resetProfile = () => (dispatch) => {
    dispatch({ type: actions.PROFILE_RESET });
};

export const updateUserProfile = (payload) => async (dispatch) => {
    dispatch({ type: actions.PROFILE_UPDATE_REQUESTED });

    try {
        const { data } = await http.post("/profile", payload);
        dispatch({
            type: actions.PROFILE_UPDATE_SUCCEEDED,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.PROFILE_UPDATE_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const resetUpdateProfile = () => (dispatch) => {
    dispatch({ type: actions.PROFILE_UPDATE_RESET });
};

export const addExperience = (payload) => async (dispatch) => {
    dispatch({ type: actions.ADD_EXPERIENCE_REQUESTED });

    try {
        const { data } = await http.put("/profile/experience", payload);
        dispatch({
            type: actions.ADD_EXPERIENCE_SUCCEEDED,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.ADD_EXPERIENCE_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const addEducation = (payload) => async (dispatch) => {
    dispatch({ type: actions.ADD_EDUCATION_REQUESTED });

    try {
        const { data } = await http.put("/profile/education", payload);
        dispatch({
            type: actions.ADD_EDUCATION_SUCCEEDED,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.ADD_EDUCATION_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
