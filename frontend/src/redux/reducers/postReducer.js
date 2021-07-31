import * as actions from "../action-types/postTypes";

const postsInitState = {
    loading: false,
    error: null,
    success: false,
    data: null,
};

export const postsReducer = (state = postsInitState, action) => {
    switch (action.type) {
        case actions.POSTS_REQUESTED:
            return {
                ...postsInitState,
                loading: true,
            };
        case actions.POSTS_SUCCEEDED:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case actions.POSTS_FAILED:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
