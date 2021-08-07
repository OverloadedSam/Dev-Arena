import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./common/protectedRoute";
import Header from "./components/header";
import Footer from "./components/footer";
import HomeScreen from "./screens/homeScreen";
import About from "./components/about";
import RegisterScreen from "./screens/registerScreen";
import LoginScreen from "./screens/loginScreen";
import Logout from "./components/logout"
import NotFound from "./common/notFound";
import DevelopersScreen from "./screens/developersScreen";
import DashboardScreen from "./screens/dashboardScreen";
import EditProfileScreen from "./screens/editProfileScreen";
import AddExperienceScreen from "./screens/addExperienceScreen";
import addEducationScreen from "./screens/addEducationScreen";
import ProfileScreen from "./screens/profileScreen";
import PostScreen from "./screens/postsScreen";
import PostDetailsScreen from "./screens/postDetailsScreen";

import "./css/bootstrap.min.css";
import "./css/index.css";
import "./css/app.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <>
            <Router>
                <>
                    <Header />
                    <ToastContainer />
                    <main>
                        <Switch>
                            <ProtectedRoute path="/post/:id" component={PostDetailsScreen} />
                            <ProtectedRoute path="/posts" component={PostScreen} />
                            <Route path="/profile/:id" component={ProfileScreen} />
                            <ProtectedRoute path="/add-education" component={addEducationScreen} />
                            <ProtectedRoute path="/add-experience" component={AddExperienceScreen} />
                            <ProtectedRoute path="/edit-Profile" component={EditProfileScreen} />
                            <ProtectedRoute path="/dashboard" component={DashboardScreen} />
                            <Route path="/developers" component={DevelopersScreen} />
                            <Route path="/not-found" component={NotFound} />
                            <Route path="/logout" component={Logout} />
                            <Route path="/about" component={About} />
                            <Route path="/login" component={LoginScreen} />
                            <Route path="/register" component={RegisterScreen} />
                            <Route path="/home" component={HomeScreen} />
                            <Redirect exact from="/" to="/home" />
                            <Redirect to="/not-found" />
                        </Switch>
                    </main>
                    <Footer />
                </>
            </Router>
        </>
    );
};

export default App;
