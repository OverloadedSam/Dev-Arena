import http from "../../services/http";
import * as actions from "../action-types/profileTypes";

export const listProfiles = () => async (dispatch) => {
    dispatch({ type: actions.PROFILES_LIST_REQUESTED });

    try {
        const { data } = await http.get("/profiles");
        dispatch({
            type: actions.PROFILES_LIST_SUCCEEDED,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: actions.PROFILES_LIST_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
