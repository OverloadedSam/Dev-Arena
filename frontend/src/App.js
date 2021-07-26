import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import ProtectedRoute from "./common/protectedRoute";
import Header from "./components/header";
import Footer from "./components/footer";
import HomeScreen from "./screens/homeScreen";
import RegisterScreen from "./screens/registerScreen";
import LoginScreen from "./screens/loginScreen";
import Logout from "./components/logout"
import NotFound from "./common/notFound";
import DevelopersScreen from "./screens/developersScreen";
import DashboardScreen from "./screens/dashboardScreen";
import EditProfileScreen from "./screens/editProfileScreen";
import AddExperienceScreen from "./screens/addExperienceScreen";
import addEducationScreen from "./screens/addEducationScreen";

import "./css/bootstrap.min.css";
import "./css/index.css";
import "./css/app.css";

const App = () => {
    return (
        <>
            <Router>
                <>
                    <Header />
                    <main>
                        <Switch>
                            <ProtectedRoute path="/add-education" component={addEducationScreen} />
                            <ProtectedRoute path="/add-experience" component={AddExperienceScreen} />
                            <ProtectedRoute path="/edit-Profile" component={EditProfileScreen} />
                            <ProtectedRoute path="/dashboard" component={DashboardScreen} />
                            <Route exact path="/developers" component={DevelopersScreen} />
                            <Route exact path="/not-found" component={NotFound} />
                            <Route exact path="/logout" component={Logout} />
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
