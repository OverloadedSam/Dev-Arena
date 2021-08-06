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

const votingInitState = {
    voting: false,
    votingError: false,
    votedSuccessfully: false,
    votes: null,
};

const addCommentInitState = {
    addingComment: false,
    addingCommentError: false,
    commentAdded: false,
    commentData: null,
};

const postInitState = {
    loading: false,
    error: null,
    success: false,
    postData: null,

    ...votingInitState,
    ...addCommentInitState,
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
                ...state,
                loading: false,
                success: true,
                postData: action.payload,
            };
        case actions.POST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // UpVote a Post.
        case actions.UP_VOTE_REQUESTED:
            return {
                ...state,
                voting: "upVoting",
            };
        case actions.UP_VOTE_SUCCEEDED:
            return {
                ...state,
                voting: false,
                votedSuccessfully: true,
                votes: action.payload,
            };
        case actions.UP_VOTE_FAILED:
            return {
                ...state,
                voting: false,
                votingError: action.payload,
            };

        // DownVote a Post.
        case actions.DOWN_VOTE_REQUESTED:
            return {
                ...state,
                voting: "downVoting",
            };
        case actions.DOWN_VOTE_SUCCEEDED:
            return {
                ...state,
                voting: false,
                votedSuccessfully: true,
                votes: action.payload,
            };
        case actions.DOWN_VOTE_FAILED:
            return {
                ...state,
                voting: false,
                votingError: action.payload,
            };

        case actions.RESET_VOTING:
            return {
                ...state,
                ...votingInitState,
            };

        // Add a Comment.
        case actions.ADD_COMMENT_REQUESTED:
            return {
                ...state,
                addingComment: true,
            };
        case actions.ADD_COMMENT_SUCCEEDED:
            return {
                ...state,
                addingComment: false,
                commentAdded: true,
                commentData: action.payload,
            };
        case actions.ADD_COMMENT_FAILED:
            return {
                ...state,
                addingComment: false,
                addingCommentError: action.payload,
            };

        default:
            return state;
    }
};
