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
