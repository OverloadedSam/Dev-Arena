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
