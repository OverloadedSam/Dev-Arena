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

const currentUserProfileInitState = {
    loading: false,
    error: null,
    success: false,
    profileData: null,
};

export const profileReducer = (state = currentUserProfileInitState, action) => {
    switch (action.type) {
        case actions.CURRENT_USER_PROFILE_REQUESTED:
            return {
                ...currentUserProfileInitState,
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

        case actions.PROFILE_RESET:
            return {
                ...currentUserProfileInitState,
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

        // Add Experience credentials.
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

        case actions.PROFILE_UPDATE_RESET:
            return {
                ...updateProfileInitState,
            };
        default:
            return state;
    }
};
