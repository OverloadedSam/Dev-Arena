import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import auth from "../services/authService";
import { composeWithDevTools } from "redux-devtools-extension";
import { userRegisterReducer, userLoginReducer } from "./reducers/userReducer";
import { profilesListReducer } from "./reducers/profileReducer";

const rootReducer = combineReducers({
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    profiles: profilesListReducer,
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
