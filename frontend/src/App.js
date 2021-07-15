import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import HomeScreen from "./screens/homeScreen";
import RegisterScreen from "./screens/registerScreen";
import LoginScreen from "./screens/loginScreen";

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
                            <Route path="/login" component={LoginScreen} />
                            <Route path="/register" component={RegisterScreen} />
                            <Route path="/home" component={HomeScreen} />
                            <Redirect exact from="/" to="/home" />
                        </Switch>
                    </main>
                    <Footer />
                </>
            </Router>
        </>
    );
};

export default App;
