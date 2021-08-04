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

const createPostInitState = {
    loading: false,
    error: null,
    success: false,
    data: null,
};

export const createPostReducer = (state = createPostInitState, action) => {
    switch (action.type) {
        case actions.CREATE_POST_REQUESTED:
            return {
                ...createPostInitState,
                loading: true,
            };
        case actions.CREATE_POST_SUCCEEDED:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case actions.CREATE_POST_FAILED:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

const postInitState = {
    loading: false,
    error: null,
    success: false,
    postData: null,
};

export const postReducer = (state = postInitState, action) => {
    switch (action.type) {
        // Get a Post By Id.
        case actions.POST_REQUESTED:
            return {
                ...postInitState,
                loading: true,
            };
        case actions.POST_SUCCEEDED:
            return {
                loading: false,
                success: true,
                postData: action.payload,
            };
        case actions.POST_FAILED:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
