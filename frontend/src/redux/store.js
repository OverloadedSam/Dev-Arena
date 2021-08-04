import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "../services/authService";
import { composeWithDevTools } from "redux-devtools-extension";
import { userRegisterReducer, userLoginReducer } from "./reducers/userReducer";
import {
    profilesListReducer,
    profileReducer,
    updateProfileReducer,
} from "./reducers/profileReducer";
import {
    createPostReducer,
    postReducer,
    postsReducer,
} from "./reducers/postReducer";

const rootReducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    profiles: profilesListReducer,
    profile: profileReducer,
    updateProfile: updateProfileReducer,
    posts: postsReducer,
    createPost: createPostReducer,
    post: postReducer,
});

const middleware = [thunk];

const user = auth.getCurrentUser();
const token = auth.getAuthToken();

const initialState = {
    userLogin: {
        isLoggedIn: user && token ? true : false,
        user,
        token,
    },
};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
