import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import Header from "./components/header";
import HomeScreen from "./screens/homeScreen";

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
                            <Route path="/home" component={HomeScreen} />
                            <Redirect exact from="/" to="/home" />
                        </Switch>
                    </main>
                </>
            </Router>
        </>
    );
};

export default App;
