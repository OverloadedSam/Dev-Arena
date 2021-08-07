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

const deleteCommentInitState = {
    deletingComment: false,
    deletingCommentError: false,
    commentDeleted: false,
};

const deletePostInitState = {
    deletingPost: false,
    deletingPostError: false,
    postDeleted: false,
};

const postInitState = {
    loading: false,
    error: null,
    success: false,
    postData: null,

    ...deletePostInitState,
    ...votingInitState,
    ...addCommentInitState,
    ...deleteCommentInitState,
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

        // Delete a Post By Id.
        case actions.DELETE_POST_REQUESTED:
            return {
                ...state,
                deletingPost: true,
            };
        case actions.DELETE_POST_SUCCEEDED:
            return {
                ...state,
                deletingPost: false,
                postDeleted: true,
            };
        case actions.DELETE_POST_FAILED:
            return {
                ...state,
                deletingPost: false,
                deletingPostError: action.payload,
            };
        case actions.RESET_DELETE_POST:
            return {
                ...state,
                ...deletePostInitState,
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

        // Delete a Comment.
        case actions.DELETE_COMMENT_REQUESTED:
            return {
                ...state,
                deletingComment: true,
            };
        case actions.DELETE_COMMENT_SUCCEEDED:
            return {
                ...state,
                deletingComment: false,
                commentDeleted: true,
            };
        case actions.DELETE_COMMENT_FAILED:
            return {
                ...state,
                deletingComment: false,
                deletingCommentError: action.payload,
            };

        default:
            return state;
    }
};
