import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../services/authService.js";

class ProtectedRoute extends Component {
    render() {
        const { component: Component, render, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={(props) => {
                    const user = auth.getCurrentUser();
                    const token = auth.getAuthToken();
                    if (!user || !token) {
                        return (
                            <Redirect
                                to={{
                                    pathname: "/login",
                                    state: {
                                        from: this.props.location,
                                    },
                                }}
                            />
                        );
                    }

                    return Component ? <Component {...props} /> : render(props);
                }}
            />
        );
    }
}

export default ProtectedRoute;
