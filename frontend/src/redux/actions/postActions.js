import http from "../../services/http";
import * as actions from "../action-types/postTypes";

export const getAllPosts = () => async (dispatch) => {
    dispatch({ type: actions.POSTS_REQUESTED });

    try {
        const { data } = await http.get(`/posts`);
        dispatch({
            type: actions.POSTS_SUCCEEDED,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.POSTS_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createPost = (payload) => async (dispatch, getState) => {
    dispatch({ type: actions.CREATE_POST_REQUESTED });

    try {
        const { data } = await http.post(`/posts`, payload);
        dispatch({
            type: actions.CREATE_POST_SUCCEEDED,
            payload: data.data,
        });

        const allPostsPayload = getState().posts.data || [];
        const user = {
            _id: getState().userLogin.user.id,
            name: getState().userLogin.user.name,
        };
        data.data.user = user;
        allPostsPayload.unshift(data.data);

        dispatch({ type: actions.POSTS_SUCCEEDED, payload: allPostsPayload });
    } catch (error) {
        dispatch({
            type: actions.CREATE_POST_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
