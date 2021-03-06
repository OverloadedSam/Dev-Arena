import * as actions from "../action-types/profileTypes";

const profilesListInitState = {
    loading: false,
    error: null,
    success: false,
    profiles: null,
};

export const profilesListReducer = (state = profilesListInitState, action) => {
    switch (action.type) {
        case actions.PROFILES_LIST_REQUESTED:
            return {
                ...profilesListInitState,
                loading: true,
            };
        case actions.PROFILES_LIST_SUCCEEDED:
            return {
                ...state,
                loading: false,
                success: true,
                profiles: action.payload,
            };
        case actions.PROFILES_LIST_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

const userProfileDetailsInitState = {
    loading: false,
    error: null,
    success: false,
    profileData: null,
};

export const profileReducer = (state = userProfileDetailsInitState, action) => {
    switch (action.type) {
        // Get Current User.
        case actions.CURRENT_USER_PROFILE_REQUESTED:
            return {
                ...userProfileDetailsInitState,
                loading: true,
            };
        case actions.CURRENT_USER_PROFILE_SUCCEEDED:
            return {
                ...state,
                loading: false,
                success: true,
                profileData: action.payload,
            };
        case actions.CURRENT_USER_PROFILE_EMPTY:
            return {
                ...state,
                loading: false,
                error: action.payload,
                profileNotSet: true,
            };
        case actions.CURRENT_USER_PROFILE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Get User By Id.
        case actions.USER_PROFILE_REQUESTED:
            return {
                ...userProfileDetailsInitState,
                loading: true,
            };
        case actions.USER_PROFILE_SUCCEEDED:
            return {
                ...state,
                loading: false,
                success: true,
                profileData: action.payload,
            };
        case actions.USER_PROFILE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case actions.PROFILE_RESET:
            return {
                ...userProfileDetailsInitState,
            };

        default:
            return state;
    }
};

const updateProfileInitState = {
    loading: false,
    error: null,
    success: false,
    updatedData: null,
};

export const updateProfileReducer = (
    state = updateProfileInitState,
    action
) => {
    switch (action.type) {
        // Create or Update User Profile.
        case actions.PROFILE_UPDATE_REQUESTED:
            return {
                ...updateProfileInitState,
                loading: true,
            };
        case actions.PROFILE_UPDATE_SUCCEEDED:
            return {
                ...state,
                loading: false,
                success: true,
                updatedData: action.payload,
            };
        case actions.PROFILE_UPDATE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Add Experience Credentials.
        case actions.ADD_EXPERIENCE_REQUESTED:
            return {
                ...updateProfileInitState,
                loading: true,
            };
        case actions.ADD_EXPERIENCE_SUCCEEDED:
            return {
                ...state,
                loading: false,
                success: true,
                updatedData: action.payload,
            };
        case actions.ADD_EXPERIENCE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Add Educational Qualifications.
        case actions.ADD_EDUCATION_REQUESTED:
            return {
                ...updateProfileInitState,
                loading: true,
            };
        case actions.ADD_EDUCATION_SUCCEEDED:
            return {
                ...state,
                loading: false,
                success: true,
                updatedData: action.payload,
            };
        case actions.ADD_EDUCATION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Delete Experience Credentials.
        case actions.DELETE_EXPERIENCE_REQUESTED:
            return {
                ...updateProfileInitState,
                loading: true,
            };
        case actions.DELETE_EXPERIENCE_SUCCEEDED:
            return {
                ...state,
                loading: false,
                success: true,
                updatedData: action.payload,
            };
        case actions.DELETE_EXPERIENCE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        // Delete Education Qualification.
        case actions.DELETE_EDUCATION_REQUESTED:
            return {
                ...updateProfileInitState,
                loading: true,
            };
        case actions.DELETE_EDUCATION_SUCCEEDED:
            return {
                ...state,
                loading: false,
                success: true,
                updatedData: action.payload,
            };
        case actions.DELETE_EDUCATION_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case actions.PROFILE_UPDATE_RESET:
            return {
                ...updateProfileInitState,
            };
        default:
            return state;
    }
};
