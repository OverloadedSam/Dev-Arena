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

export const getPostById = (id) => async (dispatch) => {
    dispatch({ type: actions.POST_REQUESTED });

    try {
        const { data } = await http.get(`/post/${id}`);
        dispatch({
            type: actions.POST_SUCCEEDED,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.POST_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const upVotePost = (id) => async (dispatch, getState) => {
    dispatch({ type: actions.UP_VOTE_REQUESTED });

    const postPayload = getState().post.postData;
    try {
        const { data } = await http.put(`/post/upvote/${id}`);

        postPayload.votes = data.votes;

        dispatch({ type: actions.UP_VOTE_SUCCEEDED, payload: data.votes });
        dispatch({ type: actions.POST_SUCCEEDED, payload: postPayload });
    } catch (error) {
        dispatch({
            type: actions.UP_VOTE_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        dispatch({ type: actions.POST_SUCCEEDED, payload: postPayload });
    }
};

export const downVotePost = (id) => async (dispatch, getState) => {
    dispatch({ type: actions.DOWN_VOTE_REQUESTED });

    const postPayload = getState().post.postData;
    try {
        const { data } = await http.put(`/post/downvote/${id}`);

        postPayload.votes = data.votes;

        dispatch({ type: actions.DOWN_VOTE_SUCCEEDED, payload: data.votes });
        dispatch({ type: actions.POST_SUCCEEDED, payload: postPayload });
    } catch (error) {
        dispatch({
            type: actions.DOWN_VOTE_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
        dispatch({ type: actions.POST_SUCCEEDED, payload: postPayload });
    }
};

export const resetVoting = () => (dispatch) => {
    dispatch({ type: actions.RESET_VOTING });
};
